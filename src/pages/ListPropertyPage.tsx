import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Clock, DollarSign, MapPin, Home, CheckCircle } from 'lucide-react';

export function ListPropertyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Submitted!</h2>
        <p className="text-gray-500 mb-4">
          Our team will review your listing within 2 hours. Once approved, your auction goes live!
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-xl text-brand-700 font-medium">
          +100 points earned for listing!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Sell Your Property</h1>
        <p className="text-gray-500 mb-8">List it. Auction it. Sold in 24 hours.</p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {s}
            </div>
            <div className={`flex-1 h-1 rounded-full ${s < step ? 'bg-brand-600' : 'bg-gray-200'} ${s === 3 ? 'hidden' : ''}`} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-brand-600" />
              Property Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g., Luxury Marina Apartment"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Townhouse</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
                <input type="number" placeholder="2500" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input type="number" placeholder="3" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input type="number" placeholder="3" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Dubai Marina, Dubai" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} placeholder="Describe your property..." className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition"
            >
              Next: Photos & Pricing
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-600" />
              Photos & Pricing
            </h2>
            {/* Upload area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-400 transition cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600">Click or drag to upload photos</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each. Min 3 photos.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                Starting Price (AED)
              </label>
              <input type="number" placeholder="1,000,000" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reserve Price (optional)</label>
              <input type="number" placeholder="Minimum price you'll accept" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition"
              >
                Next: Auction Settings
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              Auction Settings
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auction Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {['24 Hours', '36 Hours', '48 Hours'].map((d) => (
                  <button
                    key={d}
                    className="py-3 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 border border-gray-200 hover:border-brand-200 rounded-xl text-sm font-medium transition"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm font-bold text-yellow-800 mb-1">Snipe Protection Enabled</p>
              <p className="text-xs text-yellow-700">
                If a bid is placed in the last 2 minutes, the auction extends by 2 minutes automatically.
              </p>
            </div>
            <div className="bg-brand-50 rounded-xl p-4">
              <p className="text-sm font-bold text-brand-800 mb-1">Listing Fee: FREE (Launch Offer)</p>
              <p className="text-xs text-brand-600">
                Standard 2% commission on successful sale only. No upfront costs.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
              >
                Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition"
              >
                Submit for Review
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
