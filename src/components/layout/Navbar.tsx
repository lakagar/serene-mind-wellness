import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { isLoggedIn } from '@/utils/auth';
import ProfileIcon from '@/components/ProfileIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'AI Chat', href: '/ai-chat' },
    { name: 'Counseling', href: '/counseling' },
    { name: 'Group Sessions', href: '/groups' },
    { name: 'Meditation', href: '/meditation' },
    { name: 'Self Help', href: '/self-help' },
    { name: 'Medication', href: '/medication' },
    { name: 'Mood Tracker', href: '/mood-tracker' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-wellness-primary p-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-wellness-dark">SereneMinds</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium transition-colors hover:text-wellness-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loggedIn ? (
            <ProfileIcon />
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button size="sm" className="hidden md:flex bg-wellness-primary hover:bg-wellness-secondary" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="rounded-full bg-wellness-primary p-1 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                      <path d="m18 15-2-2" />
                      <path d="m15 18-2-2" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold text-wellness-dark">SereneMinds</span>
                </Link>
                <div className="grid gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium transition-colors hover:text-wellness-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="grid gap-2">
                  <Button variant="ghost" onClick={() => { setIsOpen(false); navigate('/login'); }}>
                    Sign In
                  </Button>
                  <Button className="bg-wellness-primary hover:bg-wellness-secondary" onClick={() => { setIsOpen(false); navigate('/signup'); }}>
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
