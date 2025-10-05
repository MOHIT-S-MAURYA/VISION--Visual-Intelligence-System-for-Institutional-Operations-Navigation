import type { PropsWithChildren } from 'react';
import { Eye } from 'lucide-react';
import { ThemeToggle } from '../components/shared/ThemeToggle';

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Simple header for auth pages */}
      <header className="border-b p-4 sm:p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">VISION</h1>
              <p className="text-xs text-muted-foreground">Institutional Operations Intelligence</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main auth content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VISION. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;