import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../data/properties';
import { RankBadge } from '../components/gamification/RankBadge';

export function LeaderboardPage() {
  const top3 = MOCK_LEADERBOARD.slice(0, 3);

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const podiumHeights = ['h-28', 'h-36', 'h-24'];
  const podiumBg = ['bg-gray-200', 'bg-yellow-400', 'bg-orange-200'];
  const podiumLabels = ['2nd', '1st', '3rd'];
  const podiumSize = ['w-16 h-16', 'w-20 h-20', 'w-14 h-14'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full mb-4">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <span className="text-sm font-bold text-yellow-700">Top Bidders</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Leaderboard</h1>
        <p className="text-gray-500 mt-1">Climb the ranks by bidding and winning auctions</p>
      </motion.div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-10 px-4">
        {podiumOrder.map((entry, i) => (
          entry && (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className={`${podiumSize[i]} rounded-full border-4 border-white shadow-lg`}
                />
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-2xl">👑</span>
                  </div>
                )}
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{entry.name}</p>
              <RankBadge rank={entry.bidderRank} size="sm" />
              <p className="text-xs text-gray-500 mt-1">{entry.points.toLocaleString()} pts</p>
              <div className={`${podiumHeights[i]} w-24 ${podiumBg[i]} rounded-t-xl mt-2 flex items-center justify-center`}>
                <span className="text-lg font-black text-white/80">{podiumLabels[i]}</span>
              </div>
            </motion.div>
          )
        ))}
      </div>

      {/* How points work */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-600" />
          How to earn points
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { action: 'Place a bid', points: 50 },
            { action: 'Win an auction', points: 500 },
            { action: 'Watch an auction', points: 10 },
            { action: 'Refer a friend', points: 200 },
          ].map(({ action, points }) => (
            <div key={action} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-brand-600">+{points}</p>
              <p className="text-xs text-gray-500">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            Full Rankings
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {MOCK_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
            >
              <span className={`w-8 text-center text-sm font-bold ${
                entry.rank <= 3 ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                #{entry.rank}
              </span>
              <img src={entry.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{entry.name}</p>
                <RankBadge rank={entry.bidderRank} size="sm" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{entry.points.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">{entry.auctionsWon} won</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
