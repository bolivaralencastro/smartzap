
import React, { useState } from 'react';
import { Icon } from './Icon';
import { analytics } from '../services/analytics';
import { View } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mainNavItems = [
  { id: 'cursos', icon: 'school', label: 'Cursos', targetView: 'cursos' as View },
  { id: 'usuarios', icon: 'group', label: 'Usuários', targetView: 'liderados' as View },
  { id: 'painel', icon: 'settings', label: 'Painel de Gestão', targetView: 'visaoGeral' as View },
];

const NavItem: React.FC<{
  icon: string;
  label: string;
  isActive?: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}> = ({ icon, label, isActive = false, isCollapsed, onClick }) => {
  const baseClasses = "w-full py-3 rounded-lg flex items-center gap-1 transition-colors";
  const layoutClasses = isCollapsed ? "justify-center" : "px-2 flex-col text-center";
  const activeClasses = "bg-purple-500/30 text-white";
  const inactiveClasses = "text-white/70 hover:bg-purple-500/20 hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${layoutClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-label={label}
    >
      <Icon name={icon} className="text-3xl" />
      {!isCollapsed && <span className="text-xs font-medium break-words mt-1">{label}</span>}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('cursos');

  const handleMainNavClick = (item: typeof mainNavItems[0]) => {
    analytics.track('sidebar_nav_clicked', { item: item.id, target_view: item.targetView });
    setActiveSidebarItem(item.id);
    // Note: This no longer controls the main view content.
  };

  return (
    <aside
      className={`bg-purple-900 p-2 flex flex-col items-center transition-all duration-300 w-[112px] ${isCollapsed ? 'hidden' : ''}`}
      aria-label="Main Navigation"
    >
      {/* Logo Keeps */}
      <div className="h-16 shrink-0 flex items-center justify-center w-full mb-6">
        <div className="bg-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-indigo-600 text-sm">
          KEEPS
        </div>
      </div>

      <nav className="w-full space-y-2">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSidebarItem === item.id}
            isCollapsed={false}
            onClick={() => handleMainNavClick(item)}
          />
        ))}
      </nav>

    </aside>
  );
};
