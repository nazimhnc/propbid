import { motion, AnimatePresence } from 'framer-motion';

interface PointsPopupProps {
  points: number;
  show: boolean;
  label?: string;
}

export function PointsPopup({ points, show, label }: PointsPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -40, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-50"
        >
          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
            +{points} pts {label && `(${label})`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
