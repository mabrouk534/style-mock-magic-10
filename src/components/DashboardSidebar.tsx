
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Trophy, Award, LayoutDashboard, Users, UserRound, FileText, Settings } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
        isActive
          ? 'bg-quattro-red text-white font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Main navigation items
  const mainNavItems = [
    {
      to: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: 'لوحة التحكم',
    },
    {
      to: '/dashboard/matches',
      icon: <Calendar size={20} />,
      label: 'المباريات',
    },
    {
      to: '/dashboard/tournament-program',
      icon: <Calendar size={20} />,
      label: 'برنامج المعسكر',
    },
    {
      to: '/dashboard/match-results',
      icon: <Trophy size={20} />,
      label: 'نتائج المباريات',
    },
    {
      to: '/dashboard/team-rankings',
      icon: <Award size={20} />,
      label: 'ترتيب الفرق',
    },
  ];

  // Academy management items
  const academyManagementItems = [
    {
      to: '/dashboard/academy',
      icon: <FileText size={20} />,
      label: 'بيانات الأكاديمية',
    },
    {
      to: '/dashboard/players',
      icon: <Users size={20} />,
      label: 'تسجيل اللاعبين',
    },
    {
      to: '/dashboard/staff',
      icon: <UserRound size={20} />,
      label: 'تسجيل الفريق الفني',
    },
    {
      to: '/dashboard/settings',
      icon: <Settings size={20} />,
      label: 'الإعدادات',
    },
  ];

  return (
    <aside className="w-64 border-l bg-white min-h-screen p-4">
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-quattro-red">لوحة تحكم الأكاديمية</h2>
      </div>
      
      {/* Main Navigation Section */}
      <div className="mb-6">
        <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500">الرئيسية</h3>
        <div className="flex flex-col space-y-1">
          {mainNavItems.map((item, index) => (
            <SidebarLink
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={currentPath === item.to}
            />
          ))}
        </div>
      </div>
      
      {/* Academy Management Section */}
      <div className="mb-6">
        <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500">إدارة الأكاديمية</h3>
        <div className="flex flex-col space-y-1">
          {academyManagementItems.map((item, index) => (
            <SidebarLink
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={currentPath === item.to}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
