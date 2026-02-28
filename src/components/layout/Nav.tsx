import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'Обзор', path: '/' },
  { name: 'Модели', path: '/models' },
  { name: 'Жанры', path: '/genres' },
  { name: 'Критерии', path: '/criteria' },
  { name: 'Примеры', path: '/evidence' },
  { name: 'Промпты', path: '/prompts' },
  { name: 'Методология', path: '/methodology' },
];

const Nav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Title */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="text-xl font-serif font-bold tracking-tight text-text-primary hover:opacity-80 transition-opacity">
              Lingua<span className="text-accent font-light italic">Metrics</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-text-primary px-1 py-1 border-b-2',
                    isActive
                      ? 'text-text-primary border-text-primary'
                      : 'text-text-secondary border-transparent'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isActive
                      ? 'bg-bg text-text-primary'
                      : 'text-text-secondary hover:bg-bg/50 hover:text-text-primary'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
