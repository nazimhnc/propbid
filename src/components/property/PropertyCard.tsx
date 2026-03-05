import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, Eye, Flame, Sparkles, Heart } from 'lucide-react';
import type { Property } from '../../data/types';
import { CountdownTimer } from './CountdownTimer';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/auction/${property.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {property.isHot && (
                <motion.div
                  className="flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white rounded-full text-xs font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-3 h-3" />
                  HOT
                </motion.div>
              )}
              {property.isNew && (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-brand-600 text-white rounded-full text-xs font-bold">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </div>
              )}
            </div>

            {/* Like button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>

            {/* Timer overlay */}
            <div className="absolute bottom-3 left-3">
              <CountdownTimer endsAt={property.endsAt} size="sm" />
            </div>

            {/* Watchers */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 text-white rounded-full text-xs">
              <Eye className="w-3 h-3" />
              {property.watchers}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition line-clamp-1">
                {property.title}
              </h3>
              <span className="shrink-0 text-xs px-2 py-0.5 bg-gray-100 rounded-full capitalize text-gray-600">
                {property.type}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-3">{property.location}</p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  {property.bedrooms}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5" />
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>

            {/* Bid info */}
            <div className="flex items-end justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-medium">Current Bid</p>
                <p className="text-lg font-bold text-gray-900">{formatPrice(property.currentBid)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-medium">{property.totalBids} bids</p>
                {property.hasReserve && (
                  <p className={`text-[10px] font-bold ${property.reserveMet ? 'text-green-600' : 'text-orange-500'}`}>
                    {property.reserveMet ? 'Reserve met' : 'Reserve not met'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
