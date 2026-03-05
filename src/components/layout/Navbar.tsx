import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, User, Plus, Search } from 'lucide-react';
import { MOCK_USER } from '../../data/properties';
import { RANK_CONFIG } from '../../data/types';

export function Navbar() {
  const location = useLocation();
  const user = MOCK_USER;
  const rankConfig = RANK_CONFIG[user.rank];

  const navItems = [
    { path: '/', icon: Home, label: 'Auctions' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/list', icon: Plus, label: 'Sell' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties, areas..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* User badge - desktop */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: rankConfig.bg }}>
              <span className="text-sm">{rankConfig.icon}</span>
              <span className="text-xs font-bold" style={{ color: rankConfig.color }}>
                {user.points.toLocaleString()} pts
              </span>
            </div>
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full ring-2" style={{ borderColor: rankConfig.color }} />
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                  active ? 'text-brand-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
