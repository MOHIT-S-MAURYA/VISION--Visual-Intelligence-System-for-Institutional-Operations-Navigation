import { Eye, Search } from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';
import { NotificationDropdown } from './NotificationDropdown';
import { UserDropdown } from './UserDropdown';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <span className="font-semibold tracking-tight">VISION</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search features, students, etc."
              className="input w-full pl-9"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
