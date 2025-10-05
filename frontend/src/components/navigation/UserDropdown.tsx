import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Avatar } from '../shared/Avatar';

interface UserDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default user data
  const userData = user || {
    name: 'Admin User',
    email: 'admin@vision.edu',
    role: 'Administrator',
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar
          src={userData.avatar}
          alt={userData.name}
          fallback={userData.name.charAt(0)}
          size="sm"
        />
        <span className="hidden sm:inline text-foreground">{userData.name}</span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 animate-in">
          <div className="rounded-lg border bg-popover p-1 shadow-lg">
            {/* User Info */}
            <div className="px-3 py-3 border-b mb-1">
              <p className="text-sm font-medium text-popover-foreground">{userData.name}</p>
              <p className="text-xs text-muted-foreground">{userData.email}</p>
              {userData.role && (
                <p className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {userData.role}
                </p>
              )}
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5">
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent focus:bg-accent focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent focus:bg-accent focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>

              <div className="my-1 border-t" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
