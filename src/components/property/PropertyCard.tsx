import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, FileText, Building2, Eye, Flame, TrendingUp } from 'lucide-react';
import type { Property } from '../../data/types';
import { MOCK_BUYERS } from '../../data/properties';
import { OfferAvatars } from '../visual/OfferAvatars';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  const popularity = Math.min((property.totalOffers / 10) * 100, 100);
  const isHot = property.totalOffers >= 5;
  const isTrending = property.totalOffers >= 3;
  const fakeViewers = 12 + property.totalOffers * 3 + Math.floor(Math.random() * 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', bounce: 0.3 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/property/${property.id}`} className="block group">
        <div className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100/80">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/90 backdrop-blur text-white rounded-full text-xs font-bold">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Accepting Offers
              </div>
              {isHot && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500/90 backdrop-blur text-white rounded-full text-xs font-bold"
                >
                  <Flame className="w-3 h-3" />
                  HOT
                </motion.div>
              )}
            </div>

            {/* Type badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold capitalize text-gray-700 shadow-sm">
                {property.type}
              </span>
            </div>

            {/* Bottom overlay: viewers + offers */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-white/20 backdrop-blur text-white rounded-full text-xs font-medium"
              >
                <Eye className="w-3 h-3" />
                {fakeViewers} viewing
              </motion.div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/50 backdrop-blur text-white rounded-full text-xs font-bold">
                <FileText className="w-3 h-3" />
                {property.totalOffers} offers
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition line-clamp-1 mb-1">
              {property.title}
            </h3>

            <p className="flex items-center gap-1 text-sm text-gray-500 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              {property.location}
            </p>

            <p className="flex items-center gap-1 text-xs text-gray-400 mb-3">
              <Building2 className="w-3 h-3" />
              {property.projectInfo.projectName} by {property.projectInfo.developer}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                {property.bedrooms > 0 ? `${property.bedrooms} BR` : 'Studio'}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5" />
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>

            {/* Popularity bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  {isTrending && <TrendingUp className="w-3 h-3 text-orange-500" />}
                  {isHot ? 'High Demand' : isTrending ? 'Trending' : 'Interest'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    isHot
                      ? 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500'
                      : isTrending
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gradient-to-r from-brand-400 to-brand-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${popularity}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Buyer avatars */}
            {MOCK_BUYERS[property.id] && MOCK_BUYERS[property.id].length > 0 && (
              <div className="mb-3">
                <OfferAvatars buyers={MOCK_BUYERS[property.id]} max={4} size="sm" />
              </div>
            )}

            {/* Price */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-medium">Asking Price</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formatPrice(property.askingPrice)}
                </p>
                <p className="text-xs text-gray-400">AED {property.pricePerSqft.toLocaleString()}/sqft</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
