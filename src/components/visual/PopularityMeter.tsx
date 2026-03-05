import { motion } from 'framer-motion';
import { Flame, Eye, TrendingUp } from 'lucide-react';

interface PopularityMeterProps {
  offers: number;
  maxOffers?: number;
  viewers?: number;
}

export function PopularityMeter({ offers, maxOffers = 10, viewers }: PopularityMeterProps) {
  const percentage = Math.min((offers / maxOffers) * 100, 100);
  const isHot = percentage >= 50;
  const isFire = percentage >= 80;

  const barColor = isFire
    ? 'from-orange-400 via-red-500 to-pink-500'
    : isHot
    ? 'from-yellow-400 via-orange-400 to-red-400'
    : 'from-brand-400 via-brand-500 to-brand-600';

  const label = isFire ? 'Very High Demand' : isHot ? 'High Demand' : 'Active';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isFire ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Flame className="w-4 h-4 text-red-500" />
            </motion.div>
          ) : (
            <TrendingUp className="w-4 h-4 text-brand-500" />
          )}
          <span className={`text-xs font-bold ${isFire ? 'text-red-600' : isHot ? 'text-orange-600' : 'text-brand-600'}`}>
            {label}
          </span>
        </div>
        <span className="text-xs font-bold text-gray-500">{offers} offers</span>
      </div>

      {/* Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Viewers */}
      {viewers && (
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye className="w-3.5 h-3.5 text-violet-500" />
          </motion.div>
          <span className="text-[11px] text-violet-600 font-medium">
            {viewers} people viewing right now
          </span>
        </div>
      )}
    </div>
  );
}
