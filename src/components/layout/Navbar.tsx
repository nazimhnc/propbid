import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, UserCircle, LogIn } from 'lucide-react';
import type { AuthState } from '../../App';

interface NavbarProps {
  auth: AuthState;
}

export function Navbar({ auth }: NavbarProps) {
  const location = useLocation();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 bg-gradient-to-br from-brand-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-200"
              >
                <span className="text-white font-bold text-lg">P</span>
              </motion.div>
              <span className="text-xl font-bold text-gray-900">
                Prop<span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Bid</span>
              </span>
            </Link>

            {/* Search bar - desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, areas, communities..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition border border-transparent focus:border-brand-200"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {auth.isRegistered && auth.user ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700 hidden md:block">{auth.user.fullName}</span>
                  <UserCircle className="w-5 h-5 text-green-600 md:hidden" />
                </motion.div>
              ) : (
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white rounded-xl text-sm font-medium transition shadow-md shadow-brand-200"
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-50">
        <div className="flex items-center justify-around py-2.5">
          <Link
            to="/"
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition ${
              location.pathname === '/' ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Properties</span>
            {location.pathname === '/' && (
              <motion.div
                layoutId="nav-indicator"
                className="w-1 h-1 bg-brand-600 rounded-full mt-0.5"
              />
            )}
          </Link>
          <Link
            to="/register"
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition ${
              location.pathname === '/register' ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">{auth.isRegistered ? 'Account' : 'Register'}</span>
            {location.pathname === '/register' && (
              <motion.div
                layoutId="nav-indicator"
                className="w-1 h-1 bg-brand-600 rounded-full mt-0.5"
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
