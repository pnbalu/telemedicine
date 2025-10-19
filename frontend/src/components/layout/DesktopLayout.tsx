import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DesktopLayoutProps {
  role: 'patient' | 'doctor' | 'admin';
  userName: string;
  breadcrumbs?: { label: string; path?: string; href?: string }[];
  children: React.ReactNode;
}

export default function DesktopLayout({ role, userName, breadcrumbs, children }: DesktopLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar role={role} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName={userName} userRole={role} breadcrumbs={breadcrumbs} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

