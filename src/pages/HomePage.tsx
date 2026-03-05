import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Building2, FileText, Users } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/property/PropertyCard';
import { FloatingElements } from '../components/visual/FloatingElements';
import { AnimatedCounter } from '../components/visual/AnimatedCounter';
import type { Property } from '../data/types';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'most-offers';
type FilterType = 'all' | 'apartment' | 'villa' | 'penthouse' | 'townhouse';

export function HomePage() {
  const [sort, setSort] = useState<SortOption>('newest');
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  let properties = [...MOCK_PROPERTIES];

  if (filter !== 'all') {
    properties = properties.filter((p) => p.type === filter);
  }
  if (search) {
    const q = search.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.community.toLowerCase().includes(q) ||
        p.projectInfo.developer.toLowerCase().includes(q)
    );
  }

  const sorters: Record<SortOption, (a: Property, b: Property) => number> = {
    newest: (a, b) => b.listedAt.getTime() - a.listedAt.getTime(),
    'price-low': (a, b) => a.askingPrice - b.askingPrice,
    'price-high': (a, b) => b.askingPrice - a.askingPrice,
    'most-offers': (a, b) => b.totalOffers - a.totalOffers,
  };
  properties.sort(sorters[sort]);

  const totalOffers = MOCK_PROPERTIES.reduce((sum, p) => sum + p.totalOffers, 0);

  const filterOptions: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: '🏙️' },
    { value: 'apartment', label: 'Apartments', icon: '🏢' },
    { value: 'villa', label: 'Villas', icon: '🏡' },
    { value: 'penthouse', label: 'Penthouses', icon: '🌇' },
    { value: 'townhouse', label: 'Townhouses', icon: '🏘️' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low' },
    { value: 'price-high', label: 'Price: High' },
    { value: 'most-offers', label: 'Most Offers' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Hero with floating elements */}
      <div className="relative mb-10">
        <FloatingElements />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center py-10 md:py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-brand-100 shadow-sm mb-5"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Live in Dubai</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-brand-600 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"> Dream </span>
            Property
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Explore premium Dubai properties in detail. Submit your offer directly.
            <br className="hidden md:block" />
            No middleman. No hassle.
          </p>

          {/* Animated stat cards */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-brand-600" />
              </div>
              <div className="text-left">
                <AnimatedCounter target={MOCK_PROPERTIES.length} className="text-xl font-black text-gray-900 block" />
                <p className="text-[11px] text-gray-500">Live Properties</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <AnimatedCounter target={totalOffers} className="text-xl font-black text-gray-900 block" />
                <p className="text-[11px] text-gray-500">Offers Submitted</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-left">
                <AnimatedCounter target={1247} className="text-xl font-black text-gray-900 block" />
                <p className="text-[11px] text-gray-500">Registered Buyers</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties, areas, developers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filter pills with icons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          {filterOptions.map(({ value, label, icon }) => (
            <motion.button
              key={value}
              onClick={() => setFilter(value)}
              whileTap={{ scale: 0.95 }}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${
                filter === value
                  ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-md shadow-brand-200'
                  : 'bg-white/80 backdrop-blur text-gray-600 border border-gray-200 hover:bg-white hover:shadow-sm'
              }`}
            >
              <span>{icon}</span>
              {label}
            </motion.button>
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
                  : 'bg-white/80 text-gray-500 border border-gray-200 hover:bg-white'
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Search className="w-8 h-8 text-gray-300" />
          </motion.div>
          <p className="text-gray-400 text-lg">No properties found</p>
          <p className="text-gray-300 text-sm mt-1">Try a different filter or search</p>
        </div>
      )}
    </div>
  );
}
