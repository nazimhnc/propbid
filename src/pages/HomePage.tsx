import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Building2, TrendingUp } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/property/PropertyCard';
import type { Property } from '../data/types';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'most-offers';
type FilterType = 'all' | 'apartment' | 'villa' | 'penthouse' | 'townhouse';

export function HomePage() {
  const [sort, setSort] = useState<SortOption>('newest');
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
        p.area.toLowerCase().includes(q) ||
        p.community.toLowerCase().includes(q) ||
        p.projectInfo.developer.toLowerCase().includes(q)
    );
  }

  // Sort
  const sorters: Record<SortOption, (a: Property, b: Property) => number> = {
    newest: (a, b) => b.listedAt.getTime() - a.listedAt.getTime(),
    'price-low': (a, b) => a.askingPrice - b.askingPrice,
    'price-high': (a, b) => b.askingPrice - a.askingPrice,
    'most-offers': (a, b) => b.totalOffers - a.totalOffers,
  };
  properties.sort(sorters[sort]);

  const totalOffers = MOCK_PROPERTIES.reduce((sum, p) => sum + p.totalOffers, 0);

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'villa', label: 'Villas' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'townhouse', label: 'Townhouses' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low' },
    { value: 'price-high', label: 'Price: High' },
    { value: 'most-offers', label: 'Most Offers' },
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
          Dubai Properties
        </h1>
        <p className="text-gray-500 text-lg">
          Explore units in detail. <span className="text-brand-600 font-bold">Make your offer.</span>
        </p>
      </motion.div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200">
          <Building2 className="w-4 h-4 text-brand-500" />
          <span className="text-sm font-medium text-gray-700">
            {MOCK_PROPERTIES.length} Properties
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-xl border border-brand-100">
          <TrendingUp className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-bold text-brand-700">
            {totalOffers} offers submitted
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties, areas, developers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:ml-auto">
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
          <p className="text-gray-400 text-lg">No properties found</p>
          <p className="text-gray-300 text-sm mt-1">Try a different filter or search</p>
        </div>
      )}
    </div>
  );
}
