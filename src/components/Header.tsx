import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  isLoggedIn: boolean;
  user: any;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onOpenAuth, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <HeartIcon className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              TRY IT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-200"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-200">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-base font-semibold text-sky-600 hover:bg-sky-50 rounded-xl transition-colors duration-200"
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-base font-semibold text-slate-600 hover:text-slate-800 text-left rounded-xl hover:bg-slate-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => {
                        onOpenAuth('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 text-left rounded-xl transition-colors duration-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onOpenAuth('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-base font-bold rounded-xl shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;