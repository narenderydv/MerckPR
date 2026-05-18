import React from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  ClipboardCheck, 
  FileText,
  LayoutDashboard,
  History,
  PanelLeftClose,
  PanelLeft,
  Settings
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-3.5 text-[13px] font-medium transition-all duration-300 group relative rounded-2xl",
      active 
        ? "text-white font-semibold" 
        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
    )}
    style={active ? {
      background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
      boxShadow: '0 4px 20px rgba(107,63,160,0.3)'
    } : undefined}
  >
    <Icon className={cn(
      "w-[18px] h-[18px] transition-all duration-300", 
      active ? "text-white" : "text-slate-400 group-hover:text-merck-indigo"
    )} strokeWidth={1.8} />
    {!collapsed && (
      <span className={cn("ml-3.5 truncate font-sans tracking-wide", active ? "text-white" : "")}>
        {label}
      </span>
    )}
    {active && !collapsed && (
      <div className="absolute right-3.5 w-2 h-2 rounded-full bg-merck-cyan/80 merck-soft-pulse" style={{ boxShadow: '0 0 4px rgba(0,196,240,0.3)' }} />
    )}
  </button>
);

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ activeSection, setActiveSection, collapsed, onToggle }: SidebarProps) => {
  return (
    <aside className={cn(
      "h-screen bg-white border-r border-slate-100 transition-all duration-300 flex flex-col sticky top-0 z-40",
      collapsed ? "w-20" : "w-[280px]"
    )}>
      {/* Brand Header */}
      <div className="px-6 pt-7 pb-5 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
              boxShadow: '0 4px 16px rgba(107,63,160,0.25)'
            }}
          >
            <ShieldCheck className="text-white w-5 h-5" strokeWidth={1.8} />
          </div>
          {!collapsed && (
            <div className="ml-4 overflow-hidden whitespace-nowrap">
              <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight font-display">
                Review<span className="merck-gradient-text">IQ</span>
              </h1>
              <p className="text-[10px] text-slate-400 mt-1.5 uppercase font-semibold tracking-[0.2em] leading-none">
                Review & Compliance
              </p>
            </div>
          )}
        </div>
        
        <button 
          onClick={onToggle}
          className={cn(
            "p-2 rounded-xl text-slate-300 hover:text-merck-indigo hover:bg-slate-50 transition-all duration-200",
            collapsed ? "absolute -right-3.5 top-20 bg-white shadow-md border border-slate-100 z-50 p-1.5 rounded-full" : ""
          )}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" strokeWidth={1.8} /> : <PanelLeftClose className="w-4 h-4" strokeWidth={1.8} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-2">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeSection === 'dashboard'} 
          onClick={() => setActiveSection('dashboard')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={BarChart3} 
          label="Analytics" 
          active={activeSection === 'analytics'} 
          onClick={() => setActiveSection('analytics')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={ClipboardCheck} 
          label="Periodic Reviews" 
          active={activeSection === 'reviews'} 
          onClick={() => setActiveSection('reviews')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={History} 
          label="Audit Readiness" 
          active={activeSection === 'audits'} 
          onClick={() => setActiveSection('audits')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={FileText} 
          label="Global Reports" 
          active={activeSection === 'reports'} 
          onClick={() => setActiveSection('reports')}
          collapsed={collapsed}
        />

        {!collapsed && <div className="mx-4 my-3 h-px bg-slate-100" />}
        {collapsed && <div className="mx-3 my-3 h-px bg-slate-100" />}

        <SidebarItem 
          icon={Settings} 
          label="Admin Controls" 
          active={activeSection === 'admin'} 
          onClick={() => setActiveSection('admin')}
          collapsed={collapsed}
        />
      </nav>

    </aside>
  );
};
