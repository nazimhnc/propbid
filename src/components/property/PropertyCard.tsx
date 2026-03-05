import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, FileText, Building2 } from 'lucide-react';
import type { Property } from '../../data/types';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
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
      <Link to={`/property/${property.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Accepting Offers
              </div>
            </div>

            {/* Type badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium capitalize text-gray-700">
                {property.type}
              </span>
            </div>

            {/* Offers count */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 bg-black/60 text-white rounded-full text-xs font-medium">
              <FileText className="w-3 h-3" />
              {property.totalOffers} offers
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
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  {property.bedrooms} BR
                </span>
              )}
              {property.bedrooms === 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  Studio
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

            {/* Price */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-medium">Asking Price</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-black text-gray-900">{formatPrice(property.askingPrice)}</p>
                <p className="text-xs text-gray-400">AED {property.pricePerSqft.toLocaleString()}/sqft</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
