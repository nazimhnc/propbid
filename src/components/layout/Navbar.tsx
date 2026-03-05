import { Link, useLocation } from 'react-router-dom';
import { Home, Search, UserCircle, LogIn } from 'lucide-react';
import type { AuthState } from '../../App';

interface NavbarProps {
  auth: AuthState;
}

export function Navbar({ auth }: NavbarProps) {
  const location = useLocation();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Prop<span className="text-brand-600">Bid</span>
              </span>
            </Link>

            {/* Search bar - desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, areas, communities..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {auth.isRegistered && auth.user ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-700 hidden md:block">{auth.user.fullName}</span>
                  <UserCircle className="w-5 h-5 text-green-600 md:hidden" />
                </div>
              ) : (
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:block">Register to Offer</span>
                  <span className="md:hidden">Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              location.pathname === '/' ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Properties</span>
          </Link>
          <Link
            to="/register"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              location.pathname === '/register' ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">{auth.isRegistered ? 'Account' : 'Register'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
