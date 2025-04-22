
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
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import LanguageSelector from '@/components/language/LanguageSelector';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.aiChat'), href: '/ai-chat' },
    { name: t('nav.counseling'), href: '/counseling' },
    { name: t('nav.groups'), href: '/groups' },
    { name: t('nav.meditation'), href: '/meditation' },
    { name: t('nav.selfHelp'), href: '/self-help' },
    { name: t('nav.medication'), href: '/medication' },
    { name: t('nav.moodTracker'), href: '/mood-tracker' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

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

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
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
                <Logo />
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
