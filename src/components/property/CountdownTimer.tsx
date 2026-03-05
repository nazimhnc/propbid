import { useCountdown } from '../../hooks/useCountdown';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endsAt: Date;
  size?: 'sm' | 'md' | 'lg';
}

export function CountdownTimer({ endsAt, size = 'md' }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired, isUrgent, isCritical, display, days } = useCountdown(endsAt);

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
        <span className="text-sm font-bold text-gray-500">ENDED</span>
      </div>
    );
  }

  const bgColor = isCritical ? 'bg-red-50' : isUrgent ? 'bg-orange-50' : 'bg-brand-50';
  const textColor = isCritical ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-brand-700';
  const dotColor = isCritical ? 'bg-red-500' : isUrgent ? 'bg-orange-500' : 'bg-brand-500';

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 ${bgColor} rounded-lg`}>
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className={`text-xs font-bold ${textColor}`}>{display}</span>
      </div>
    );
  }

  if (size === 'lg') {
    const timeBlocks = days > 0
      ? [
          { value: days, label: 'DAYS' },
          { value: hours, label: 'HRS' },
          { value: minutes, label: 'MIN' },
          { value: seconds, label: 'SEC' },
        ]
      : [
          { value: hours, label: 'HRS' },
          { value: minutes, label: 'MIN' },
          { value: seconds, label: 'SEC' },
        ];

    return (
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${dotColor}`}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <div className="flex items-center gap-1.5">
          {timeBlocks.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`${bgColor} rounded-lg px-3 py-2 min-w-[52px] text-center`}>
                <motion.span
                  key={value}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`block text-xl font-bold ${textColor}`}
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
                <span className="text-[9px] font-medium text-gray-400">{label}</span>
              </div>
              {i < timeBlocks.length - 1 && (
                <span className={`text-lg font-bold ${textColor}`}>:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default md
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bgColor} rounded-lg`}>
      <motion.div
        className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className={`text-sm font-bold ${textColor}`}>{display}</span>
    </div>
  );
}
