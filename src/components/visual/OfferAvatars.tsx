import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import type { BuyerAvatar } from '../../data/types';

interface OfferAvatarsProps {
  buyers: BuyerAvatar[];
  max?: number;
  size?: 'sm' | 'md';
  showDetails?: boolean;
}

export function OfferAvatars({ buyers, max = 5, size = 'sm', showDetails = false }: OfferAvatarsProps) {
  const visible = buyers.slice(0, max);
  const remaining = buyers.length - max;
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const overlap = size === 'sm' ? '-ml-2' : '-ml-2.5';

  if (!showDetails) {
    // Compact stacked row (for PropertyCard)
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {visible.map((buyer, i) => (
            <motion.div
              key={buyer.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${dim} rounded-full border-2 border-white flex items-center justify-center ${textSize} font-bold text-white relative ${
                i > 0 ? overlap : ''
              }`}
              style={{ backgroundColor: buyer.color, zIndex: visible.length - i }}
            >
              {buyer.initials}
              {buyer.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                  <Shield className="w-1.5 h-1.5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
          {remaining > 0 && (
            <div
              className={`${dim} rounded-full border-2 border-white bg-gray-200 flex items-center justify-center ${textSize} font-bold text-gray-600 ${overlap}`}
              style={{ zIndex: 0 }}
            >
              +{remaining}
            </div>
          )}
        </div>
        <span className="text-[10px] text-gray-500 font-medium">
          {buyers.length} interested
        </span>
      </div>
    );
  }

  // Detailed list (for PropertyPage sidebar)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Buyers Interested</p>
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
          {buyers.length}
        </span>
      </div>
      {visible.map((buyer, i) => (
        <motion.div
          key={buyer.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white relative shrink-0"
            style={{ backgroundColor: buyer.color }}
          >
            {buyer.initials}
            {buyer.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-800">Buyer {buyer.initials}</span>
              {buyer.verified && (
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400">{buyer.timeAgo}</span>
          </div>
        </motion.div>
      ))}
      {remaining > 0 && (
        <p className="text-[10px] text-gray-400 text-center pt-1">
          +{remaining} more buyers
        </p>
      )}
    </div>
  );
}
