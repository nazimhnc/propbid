import type { BidderRank } from '../../data/types';
import { RANK_CONFIG } from '../../data/types';

interface RankBadgeProps {
  rank: BidderRank;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RankBadge({ rank, size = 'md', showLabel = true }: RankBadgeProps) {
  const config = RANK_CONFIG[rank];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold ${sizeClasses[size]}`}
      style={{ background: config.bg, color: config.color }}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
