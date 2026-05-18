import { Application } from '../../types';
import { Badge } from '../ui/Badge';
import { 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  Search, 
  Filter,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ApplicationTableProps {
  applications: Application[];
  onRowClick: (app: Application) => void;
}

export const ApplicationTable = ({ applications, onRowClick }: ApplicationTableProps) => {
  return (
    <div className="merck-card overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">Systems Registry</h3>
          <span className="px-2.5 py-0.5 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-semibold border border-slate-100">{applications.length} records</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" strokeWidth={1.8} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs w-56 focus:outline-none focus:ring-2 focus:ring-merck-indigo/10 transition-all font-medium placeholder:text-slate-300"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-100 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">System</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Owner & Division</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Last review Date</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Next Due Date</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center">Year</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center">Observations</th>
              <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {applications.map((app) => (
              <tr 
                key={app.id} 
                className="group hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                onClick={() => onRowClick(app)}
              >
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-merck-indigo transition-colors">{app.name}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-[10px] font-mono font-medium text-slate-400 tracking-tight">ID: {app.id}</span>
                      <span className="text-[9px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded-md font-medium border border-slate-100">RDID: {app.rdid}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-700">{app.owner}</span>
                    <span className="text-[10px] text-merck-indigo font-semibold mt-0.5">{app.division}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{app.lastAuditDate}</span>
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-wider mt-0.5",
                      app.lastAuditOutcome === 'No Findings' ? "text-merck-green" : "text-merck-magenta"
                    )}>{app.lastAuditOutcome}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-bold text-slate-700">
                    {app.lastAuditDate ? `${parseInt(app.lastAuditDate.split('-')[0]) + 1}-${app.lastAuditDate.split('-')[1]}-${app.lastAuditDate.split('-')[2]}` : 'N/A'}
                  </span>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="text-xs font-bold text-slate-700 font-mono">{app.prHistory?.[0]?.year || 'N/A'}</span>
                </td>
                <td className="px-8 py-5 text-center">
                  <Badge variant={
                    app.prStatus === 'Completed' ? 'success' :
                    app.prStatus === 'Pending' ? 'info' : 'danger'
                  } className="px-3 py-1 font-display">
                    {app.prStatus}
                  </Badge>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className={cn(
                    "text-xs font-bold font-mono px-2 py-1 rounded-md",
                    app.observations?.length > 0 ? "bg-merck-magenta/10 text-merck-magenta" : "bg-slate-100 text-slate-500"
                  )}>
                    {app.observations?.length || 0}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-300 hover:text-merck-indigo hover:bg-merck-indigo/5 rounded-xl transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-merck-indigo hover:bg-merck-indigo/5 rounded-xl transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-8 py-4 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[10px] text-slate-300 font-medium">Displaying active system inventory</p>
        <div className="flex items-center space-x-4">
          <button className="text-[10px] font-medium text-slate-300 cursor-not-allowed">Previous</button>
          <div className="h-4 w-px bg-slate-100" />
          <button className="text-[10px] font-semibold text-merck-indigo hover:text-merck-deep transition-colors">Next Page</button>
        </div>
      </div>
    </div>
  );
};
