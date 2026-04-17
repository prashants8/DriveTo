import { LayoutGrid, Upload, LogOut, Shield, HardDrive } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: 'dashboard' | 'upload';
  setActiveTab: (tab: 'dashboard' | 'upload') => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'upload', label: 'Upload', icon: Upload },
  ];

  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <HardDrive className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">DriveTo</span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
              activeTab === item.id 
                ? "bg-indigo-600/10 text-indigo-400" 
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-950/30 hover:text-red-400 transition-all font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
