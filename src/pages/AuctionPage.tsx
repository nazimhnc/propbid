import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Heart, Share2, Eye, Bed, Bath, Maximize, MapPin,
  Shield, Star, ChevronRight, Zap, AlertTriangle,
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import { CountdownTimer } from '../components/property/CountdownTimer';
import { RankBadge } from '../components/gamification/RankBadge';
import { PointsPopup } from '../components/gamification/PointsPopup';
import type { Bid } from '../data/types';

export function AuctionPage() {
  const { id } = useParams();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState<Bid[]>(property?.bidHistory ?? []);
  const [showPoints, setShowPoints] = useState(false);
  const [liked, setLiked] = useState(false);
  const [justBid, setJustBid] = useState(false);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Auction not found</p>
        <Link to="/" className="text-brand-600 font-medium mt-2 inline-block">Back to auctions</Link>
      </div>
    );
  }

  const currentBid = bids.length > 0 ? bids[0].amount : property.startingPrice;
  const minNext = Math.ceil(currentBid * 1.02); // 2% minimum increment

  const formatPrice = (price: number) => `AED ${price.toLocaleString()}`;

  const quickBids = [
    { label: '+2%', amount: Math.ceil(currentBid * 1.02) },
    { label: '+5%', amount: Math.ceil(currentBid * 1.05) },
    { label: '+10%', amount: Math.ceil(currentBid * 1.10) },
  ];

  const placeBid = useCallback((amount: number) => {
    if (amount < minNext) return;

    const newBid: Bid = {
      id: `user-${Date.now()}`,
      bidder: 'You',
      avatar: 'https://ui-avatars.com/api/?name=You&background=2563eb&color=fff',
      amount,
      timestamp: new Date(),
      rank: 'gold',
    };

    setBids([newBid, ...bids]);
    setBidAmount('');
    setJustBid(true);
    setShowPoints(true);
    setTimeout(() => setShowPoints(false), 1500);
    setTimeout(() => setJustBid(false), 2000);
  }, [bids, minNext]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-24 md:pb-6">
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition">
        <ArrowLeft className="w-4 h-4" />
        All Auctions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — Images + Details */}
        <div className="lg:col-span-3 space-y-5">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Watchers */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 text-white rounded-full text-sm">
              <Eye className="w-4 h-4" />
              {property.watchers} watching
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition ${
                  selectedImage === i ? 'border-brand-600' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Property details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-gray-100 rounded-full text-xs capitalize text-gray-600 font-medium">
                {property.type}
              </span>
              {property.isHot && (
                <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-bold">
                  HOT
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
            <p className="flex items-center gap-1.5 text-gray-500 mb-4">
              <MapPin className="w-4 h-4" />
              {property.location}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{property.bedrooms}</p>
                    <p className="text-[10px] text-gray-400">Bedrooms</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{property.bathrooms}</p>
                  <p className="text-[10px] text-gray-400">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{property.sqft.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400">Sq Ft</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h3 className="font-bold text-gray-900 mb-2">About this property</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mt-4">
              <h3 className="font-bold text-gray-900 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 bg-gray-50 rounded-xl text-xs text-gray-600 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Seller */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Seller</h3>
              <div className="flex items-center gap-3">
                <img src={property.seller.avatar} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{property.seller.name}</p>
                    {property.seller.verified && (
                      <Shield className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {property.seller.rating}
                    </span>
                    <span>{property.seller.totalSales} sales</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Bidding Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Bidding Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
            {/* Timer */}
            <div className="mb-5">
              <p className="text-xs text-gray-400 uppercase font-medium mb-2">Auction Ends In</p>
              <CountdownTimer endsAt={property.endsAt} size="lg" />
            </div>

            {/* Current bid */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-400 uppercase font-medium mb-1">Current Bid</p>
              <p className="text-3xl font-black text-gray-900">{formatPrice(currentBid)}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">{bids.length} bids</p>
                {property.hasReserve && (
                  <p className={`text-xs font-bold ${property.reserveMet ? 'text-green-600' : 'text-orange-500'}`}>
                    {property.reserveMet ? 'Reserve met' : 'Reserve not met'}
                  </p>
                )}
              </div>
            </div>

            {/* Quick bid buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {quickBids.map(({ label, amount }) => (
                <button
                  key={label}
                  onClick={() => placeBid(amount)}
                  className="relative py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-center transition"
                >
                  <span className="text-xs font-medium text-brand-500">{label}</span>
                  <br />
                  <span className="text-sm font-bold">{formatPrice(amount)}</span>
                </button>
              ))}
            </div>

            {/* Custom bid */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">AED</span>
                <input
                  type="number"
                  placeholder={minNext.toLocaleString()}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="relative">
                <PointsPopup points={50} show={showPoints} label="Bid" />
                <motion.button
                  onClick={() => {
                    const amt = parseInt(bidAmount);
                    if (!isNaN(amt)) placeBid(amt);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold transition flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  Bid
                </motion.button>
              </div>
            </div>

            {/* Bid success flash */}
            <AnimatePresence>
              {justBid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-green-700">Bid placed! +50 points</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Snipe protection notice */}
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-xl mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-700">
                <span className="font-bold">Snipe protection:</span> Bids in the last 2 minutes extend the auction by 2 minutes.
              </p>
            </div>

            {/* Bid history */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Bid History</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {bids.map((bid, i) => (
                  <motion.div
                    key={bid.id}
                    initial={i === 0 ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      i === 0 ? 'bg-brand-50 border border-brand-100' : 'bg-gray-50'
                    }`}
                  >
                    <img src={bid.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">{bid.bidder}</span>
                        <RankBadge rank={bid.rank} size="sm" showLabel={false} />
                      </div>
                      <p className="text-xs text-gray-400">
                        {bid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(bid.amount)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
