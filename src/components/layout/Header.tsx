import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Menu, ChevronRight, LogOut, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  breadcrumb?: string[];
}

const NOTIFICATIONS = [
  { id: '1', title: 'New Critical Observation', description: 'System SAP-FIN requires immediate CAPA analysis.', time: '10m ago', type: 'critical' },
  { id: '2', title: 'PR Milestone Reached', description: 'LIMS-72 Periodic Review successfully completed.', time: '2h ago', type: 'success' },
  { id: '3', title: 'Upcoming Audit', description: 'Internal Quality Audit scheduled for next Tuesday.', time: '5h ago', type: 'info' },
];

export const Header = ({ onMenuToggle, title, breadcrumb }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center space-x-6">
        <button 
          onClick={onMenuToggle}
          className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-merck-indigo md:hidden transition-all"
        >
          <Menu className="w-5 h-5" strokeWidth={1.8} />
        </button>

        <div className="hidden sm:flex flex-col">
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center text-[10px] text-slate-400 uppercase font-semibold tracking-[0.15em] mb-1">
              {breadcrumb.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="hover:text-merck-indigo cursor-pointer transition-colors">{item}</span>
                  {idx < breadcrumb.length - 1 && <ChevronRight className="w-2.5 h-2.5 mx-2 opacity-30" />}
                </React.Fragment>
              ))}
            </div>
          )}
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">{title}</h2>
        </div>
      </div>

      <div className="flex items-center space-x-5">


        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className={cn(
                "p-2.5 rounded-xl relative transition-all duration-300 group",
                showNotifications 
                  ? "text-white" 
                  : "text-slate-400 hover:text-merck-indigo hover:bg-slate-50"
              )}
              style={showNotifications ? {
                background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
                boxShadow: '0 4px 16px rgba(107,63,160,0.25)'
              } : undefined}
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
              {!showNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-merck-magenta rounded-full merck-soft-pulse" style={{ boxShadow: '0 0 6px #E8358A, 0 0 12px rgba(232,53,138,0.4)' }} />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 z-50 origin-top-right merck-glow"
                >
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</h3>
                    <button className="text-[10px] font-semibold text-merck-indigo hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <button key={n.id} className="w-full text-left p-3.5 hover:bg-slate-50 rounded-xl transition-all group mb-0.5">
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "w-2 h-2 mt-1.5 rounded-full shrink-0",
                            n.type === 'critical' ? "bg-merck-magenta merck-soft-pulse" : n.type === 'success' ? "bg-merck-green" : "bg-merck-cyan"
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-merck-indigo transition-colors">{n.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{n.description}</p>
                            <div className="flex items-center mt-2 text-[10px] font-medium text-slate-300">
                              <Clock className="w-3 h-3 mr-1" strokeWidth={1.8} />
                              {n.time}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className="w-full py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider hover:text-merck-indigo border-t border-slate-50 transition-colors">
                    View All Alerts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="h-7 w-px bg-slate-100 hidden sm:block" />

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className={cn(
                "flex items-center space-x-3.5 p-1.5 rounded-xl transition-all group",
                showProfile ? "bg-slate-50" : "hover:bg-slate-50"
              )}
            >
              <div className="text-right hidden xl:block">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-merck-indigo transition-colors tracking-tight font-display">Dr. Elena Fisher</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide leading-none mt-0.5">Compliance Lead</p>
              </div>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center p-0.5 transition-all"
                style={{
                  background: showProfile 
                    ? 'linear-gradient(135deg, #7B4FB8, #4A2D7A)' 
                    : 'rgba(107,63,160,0.08)'
                }}
              >
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <User className={cn("w-4 h-4", showProfile ? "text-merck-indigo" : "text-slate-400")} strokeWidth={1.8} />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 z-50 origin-top-right merck-glow"
                >
                  <div className="p-4 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-900 font-display">Dr. Elena Fisher</p>
                  </div>
                  <div className="p-1.5">

                    <button className="w-full flex items-center space-x-3 px-3.5 py-3 hover:bg-merck-magenta/[0.03] rounded-xl transition-all group text-slate-400 hover:text-merck-magenta">
                      <LogOut className="w-4 h-4" strokeWidth={1.8} />
                      <span className="text-xs font-medium">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
