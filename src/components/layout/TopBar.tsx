import React from 'react';
import { Search, Bell, Settings, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  userName: string;
  userRole: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export default function TopBar({ userName, userRole, breadcrumbs }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Breadcrumbs or Search */}
      <div className="flex items-center gap-4 flex-1">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"}>
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search patients, appointments, records..." 
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>

        <div className="h-8 w-px bg-gray-200"></div>

        {/* User Menu */}
        <button className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left hidden xl:block">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden xl:block" />
        </button>
      </div>
    </header>
  );
}

