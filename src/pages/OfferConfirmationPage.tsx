import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, PartyPopper, Star } from 'lucide-react';
import { Confetti } from '../components/visual/Confetti';

export function OfferConfirmationPage() {
  const location = useLocation();
  const state = location.state as {
    propertyTitle?: string;
    amount?: number;
    buyerName?: string;
  } | null;

  return (
    <>
      <Confetti />

      <div className="max-w-xl mx-auto px-4 py-12 text-center relative">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-200/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10">
          {/* Animated success icon */}
          <div className="relative inline-block mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
              className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-200"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>
            {/* Orbiting stars */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute -top-2 left-1/2" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 absolute top-1/2 -right-3" />
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 absolute -bottom-1 left-2" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', bounce: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-4"
            >
              <PartyPopper className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">Congratulations!</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Offer
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"> Submitted!</span>
            </h1>

            {state?.amount && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block bg-white/90 backdrop-blur rounded-2xl px-8 py-6 border border-gray-100 shadow-lg mb-6"
              >
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Your Offer</p>
                <p className="text-4xl font-black bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                  AED {state.amount.toLocaleString()}
                </p>
                {state.propertyTitle && (
                  <p className="text-sm text-gray-500 mt-2">{state.propertyTitle}</p>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-8 text-left max-w-md mx-auto border border-gray-100 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 mb-4">What happens next?</h3>
              <div className="space-y-4">
                {[
                  { step: 1, text: 'The seller receives your offer and check copy securely', color: 'from-brand-500 to-brand-600' },
                  { step: 2, text: 'They review all offers (usually within 24-48 hours)', color: 'from-violet-500 to-violet-600' },
                  { step: 3, text: 'If selected, you\'ll be contacted to proceed with the DLD transfer', color: 'from-green-500 to-green-600' },
                  { step: 4, text: 'You\'ll receive email updates on your offer status', color: 'from-orange-500 to-orange-600' },
                ].map(({ step, text, color }, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-7 h-7 bg-gradient-to-br ${color} rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                      <span className="text-xs font-bold text-white">{step}</span>
                    </div>
                    <p className="text-sm text-gray-600">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white rounded-xl font-bold transition shadow-lg shadow-brand-200"
              >
                <Home className="w-4 h-4" />
                Browse More Properties
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
