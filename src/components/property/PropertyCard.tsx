import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, Flame } from 'lucide-react';
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

  const isHot = property.totalOffers >= 5;

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold capitalize text-gray-700 shadow-sm">
                {property.type}
              </span>
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

            {/* Price on image */}
            <div className="absolute bottom-3 left-3">
              <p className="text-xl font-black text-white drop-shadow-lg">
                {formatPrice(property.askingPrice)}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition line-clamp-1 mb-1">
              {property.title}
            </h3>

            <p className="flex items-center gap-1 text-sm text-gray-500 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              {property.location}
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

            {/* Buyer avatars */}
            {MOCK_BUYERS[property.id] && MOCK_BUYERS[property.id].length > 0 && (
              <OfferAvatars buyers={MOCK_BUYERS[property.id]} max={4} size="sm" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
