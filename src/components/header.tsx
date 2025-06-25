
'use client';

import Link from 'next/link';
import {
  Menu,
  Ticket,
  Wallet,
  LogOut,
  User,
  Ticket as TicketIcon,
  Lightbulb,
  Shield,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Events', icon: TicketIcon, public: true },
  { href: '/my-tickets', label: 'My Tickets', icon: User, public: false },
  { href: '/recommendations', label: 'For You', icon: Lightbulb, public: false },
  { href: '/admin', label: 'Admin', icon: Shield, public: false, adminOnly: true },
];

export function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const filteredNavLinks = navLinks.filter(link => {
    // Public links are visible to everyone
    if (link.public) return true;

    // From here, links are for authenticated users only
    if (!isAuthenticated) return false;
    
    // Admin links are for admins only
    if (link.adminOnly) return isAdmin;

    // Regular authenticated user links are not for admins
    return !isAdmin;
  });

  const AuthButton = () => (
    <>
      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="truncate max-w-[100px]">{user.address}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
             <DropdownMenuLabel>
                Logged in as {user.role}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
            <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Link>
        </Button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">TicketMint</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-6 flex items-center space-x-2">
                <Ticket className="h-6 w-6 text-primary" />
                <span className="font-bold">TicketMint</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {filteredNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                      pathname === link.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
