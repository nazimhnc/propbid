export interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  type: 'apartment' | 'villa' | 'penthouse' | 'townhouse' | 'land';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  startingPrice: number;
  currentBid: number;
  totalBids: number;
  watchers: number;
  endsAt: Date;
  seller: Seller;
  bidHistory: Bid[];
  isHot: boolean;
  isNew: boolean;
  hasReserve: boolean;
  reserveMet: boolean;
}

export interface Seller {
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalSales: number;
}

export interface Bid {
  id: string;
  bidder: string;
  avatar: string;
  amount: number;
  timestamp: Date;
  rank: BidderRank;
}

export type BidderRank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface UserProfile {
  name: string;
  avatar: string;
  rank: BidderRank;
  points: number;
  pointsToNextRank: number;
  totalBids: number;
  auctionsWon: number;
  badges: Badge[];
  watchlist: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  bidderRank: BidderRank;
  points: number;
  auctionsWon: number;
}

export const RANK_CONFIG: Record<BidderRank, { label: string; color: string; bg: string; minPoints: number; icon: string }> = {
  bronze: { label: 'Bronze', color: '#CD7F32', bg: '#FEF3C7', minPoints: 0, icon: '🥉' },
  silver: { label: 'Silver', color: '#C0C0C0', bg: '#F1F5F9', minPoints: 500, icon: '🥈' },
  gold: { label: 'Gold', color: '#FFD700', bg: '#FFFBEB', minPoints: 2000, icon: '🥇' },
  platinum: { label: 'Platinum', color: '#E5E4E2', bg: '#F8FAFC', minPoints: 5000, icon: '💎' },
  diamond: { label: 'Diamond', color: '#B9F2FF', bg: '#ECFEFF', minPoints: 15000, icon: '👑' },
};
