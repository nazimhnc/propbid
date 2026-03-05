import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';

export function OfferConfirmationPage() {
  const location = useLocation();
  const state = location.state as {
    propertyTitle?: string;
    amount?: number;
    buyerName?: string;
  } | null;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-black text-gray-900 mb-3">Offer Submitted!</h1>

        {state?.amount && (
          <div className="inline-block bg-white rounded-2xl px-8 py-5 border border-gray-100 shadow-sm mb-6">
            <p className="text-xs text-gray-400 uppercase font-medium mb-1">Your Offer</p>
            <p className="text-3xl font-black text-brand-600">AED {state.amount.toLocaleString()}</p>
            {state.propertyTitle && (
              <p className="text-sm text-gray-500 mt-1">{state.propertyTitle}</p>
            )}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="font-bold text-gray-900 mb-3">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-brand-600">1</span>
              </div>
              <p className="text-sm text-gray-600">
                The seller receives your offer and check copy securely
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-brand-600">2</span>
              </div>
              <p className="text-sm text-gray-600">
                They review all offers (usually within 24-48 hours)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-brand-600">3</span>
              </div>
              <p className="text-sm text-gray-600">
                If selected, you'll be contacted to proceed with the DLD transfer
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-brand-600">4</span>
              </div>
              <p className="text-sm text-gray-600">
                You'll receive email updates on your offer status
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition"
          >
            <Home className="w-4 h-4" />
            Browse More Properties
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
