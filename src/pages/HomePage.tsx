import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Clock, TrendingUp, SlidersHorizontal } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/property/PropertyCard';
import type { Property } from '../data/types';

type SortOption = 'ending-soon' | 'most-bids' | 'price-low' | 'price-high' | 'hot';
type FilterType = 'all' | 'apartment' | 'villa' | 'penthouse' | 'townhouse' | 'land';

export function HomePage() {
  const [sort, setSort] = useState<SortOption>('ending-soon');
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  let properties = [...MOCK_PROPERTIES];

  // Filter
  if (filter !== 'all') {
    properties = properties.filter((p) => p.type === filter);
  }

  if (search) {
    const q = search.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
    );
  }

  // Sort
  const sorters: Record<SortOption, (a: Property, b: Property) => number> = {
    'ending-soon': (a, b) => a.endsAt.getTime() - b.endsAt.getTime(),
    'most-bids': (a, b) => b.totalBids - a.totalBids,
    'price-low': (a, b) => a.currentBid - b.currentBid,
    'price-high': (a, b) => b.currentBid - a.currentBid,
    hot: (a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) || b.watchers - a.watchers,
  };

  properties.sort(sorters[sort]);

  const endingSoon = MOCK_PROPERTIES.filter(
    (p) => p.endsAt.getTime() - Date.now() < 3600000
  ).length;

  const sortOptions: { value: SortOption; label: string; icon: typeof Clock }[] = [
    { value: 'ending-soon', label: 'Ending Soon', icon: Clock },
    { value: 'hot', label: 'Hottest', icon: Flame },
    { value: 'most-bids', label: 'Most Bids', icon: TrendingUp },
    { value: 'price-low', label: 'Price: Low', icon: TrendingUp },
    { value: 'price-high', label: 'Price: High', icon: TrendingUp },
  ];

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'villa', label: 'Villas' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'land', label: 'Commercial' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Real Estate Auctions
        </h1>
        <p className="text-gray-500 text-lg">
          Buy & sell properties in <span className="text-brand-600 font-bold">24 hours</span>.
          Bid, win, own.
        </p>
      </motion.div>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-700">
            {MOCK_PROPERTIES.length} Live Auctions
          </span>
        </div>
        {endingSoon > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-600">
              {endingSoon} ending within 1 hour
            </span>
          </div>
        )}
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Mobile search */}
        <div className="md:hidden relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          {filterOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === value
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide md:ml-auto">
          {sortOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSort(value)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition ${
                sort === value
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No auctions found</p>
          <p className="text-gray-300 text-sm mt-1">Try a different filter or search</p>
        </div>
      )}
    </div>
  );
}
