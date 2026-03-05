import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Zap } from 'lucide-react';
import { MOCK_USER } from '../data/properties';
import { RANK_CONFIG } from '../data/types';
import { RankBadge } from '../components/gamification/RankBadge';

export function ProfilePage() {
  const user = MOCK_USER;
  const rankConfig = RANK_CONFIG[user.rank];
  const progress = (user.points / user.pointsToNextRank) * 100;

  const ranks = Object.entries(RANK_CONFIG);
  const currentRankIndex = ranks.findIndex(([key]) => key === user.rank);
  const nextRank = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full ring-4"
              style={{ borderColor: rankConfig.color }}
            />
            <div className="absolute -bottom-1 -right-1">
              <RankBadge rank={user.rank} size="sm" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm">Member since January 2024</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Zap className="w-5 h-5 text-brand-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-gray-900">{user.totalBids}</p>
            <p className="text-xs text-gray-500">Total Bids</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-gray-900">{user.auctionsWon}</p>
            <p className="text-xs text-gray-500">Won</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-gray-900">{user.points.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </div>

        {/* Rank progress */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <RankBadge rank={user.rank} size="md" />
            </div>
            {nextRank && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>{(user.pointsToNextRank - user.points).toLocaleString()} pts to</span>
                <RankBadge rank={nextRank[0] as any} size="sm" />
              </div>
            )}
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: rankConfig.color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1 text-right">
            {user.points.toLocaleString()} / {user.pointsToNextRank.toLocaleString()} pts
          </p>
        </div>
      </motion.div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-600" />
          Badges ({user.badges.filter((b) => b.earned).length}/{user.badges.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {user.badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl p-4 text-center border ${
                badge.earned
                  ? 'bg-white border-brand-100 shadow-sm'
                  : 'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <span className="text-3xl block mb-2">{badge.icon}</span>
              <p className="text-xs font-bold text-gray-900">{badge.name}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{badge.description}</p>
              {badge.earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px]">✓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rank ladder */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">Rank Ladder</h2>
        <div className="space-y-3">
          {ranks.map(([key, config], i) => {
            const isCurrent = key === user.rank;
            const isAchieved = i <= currentRankIndex;
            return (
              <div
                key={key}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  isCurrent ? 'bg-brand-50 border border-brand-100' : isAchieved ? 'bg-gray-50' : 'opacity-40'
                }`}
              >
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isCurrent ? 'text-brand-700' : 'text-gray-900'}`}>
                    {config.label}
                  </p>
                  <p className="text-xs text-gray-500">{config.minPoints.toLocaleString()} points required</p>
                </div>
                {isCurrent && (
                  <span className="text-xs font-bold text-brand-600 px-2 py-1 bg-brand-100 rounded-full">
                    CURRENT
                  </span>
                )}
                {isAchieved && !isCurrent && (
                  <span className="text-xs text-green-600">✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
