import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, DollarSign, Upload, FileText, CheckCircle, AlertCircle,
  Shield, Building2, MapPin,
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import type { AuthState } from '../App';

interface SubmitOfferPageProps {
  auth: AuthState;
}

export function SubmitOfferPage({ auth }: SubmitOfferPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  const [offerAmount, setOfferAmount] = useState('');
  const [checkFile, setCheckFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!auth.isRegistered) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">You need to register first</p>
        <Link
          to="/register"
          state={{ returnTo: `/offer/${id}` }}
          className="text-brand-600 font-medium"
        >
          Register with Emirates ID
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Property not found</p>
        <Link to="/" className="text-brand-600 font-medium mt-2 inline-block">Back to properties</Link>
      </div>
    );
  }

  const formatPrice = (price: number) => `AED ${price.toLocaleString()}`;

  const validate = () => {
    const e: Record<string, string> = {};
    const amount = parseInt(offerAmount.replace(/,/g, ''));
    if (!offerAmount.trim() || isNaN(amount) || amount <= 0) {
      e.amount = 'Please enter a valid offer amount';
    }
    if (!checkFile) {
      e.check = 'Please upload a copy of the check';
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate('/offer-confirmed', {
        state: {
          propertyTitle: property.title,
          amount: parseInt(offerAmount.replace(/,/g, '')),
          buyerName: auth.user?.fullName,
        },
      });
    }, 2000);
  };

  const formatInput = (value: string) => {
    const num = value.replace(/[^0-9]/g, '');
    if (!num) return '';
    return parseInt(num).toLocaleString();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Back */}
      <Link
        to={`/property/${property.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to property
      </Link>

      {/* Property summary */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={property.image}
            alt=""
            className="w-20 h-16 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {property.location}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3" />
              {property.projectInfo.projectName}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-gray-400">Asking</p>
            <p className="text-sm font-black text-gray-900">{formatPrice(property.askingPrice)}</p>
          </div>
        </div>
      </div>

      {/* Offer form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6"
      >
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-1">Submit Your Offer</h2>
          <p className="text-sm text-gray-500">
            Submitting as <span className="font-bold text-gray-700">{auth.user?.fullName}</span>
          </p>
        </div>

        {/* Offer amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <DollarSign className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Your Offer Amount (AED)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">AED</span>
            <input
              type="text"
              placeholder="e.g., 3,500,000"
              value={offerAmount}
              onChange={(e) => {
                setOfferAmount(formatInput(e.target.value));
                if (errors.amount) {
                  const newErrors = { ...errors };
                  delete newErrors.amount;
                  setErrors(newErrors);
                }
              }}
              className={`w-full pl-14 pr-4 py-4 bg-gray-50 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.amount ? 'ring-2 ring-red-300' : ''
              }`}
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.amount}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Asking price: {formatPrice(property.askingPrice)} &middot;
            You can offer above or below the asking price
          </p>
        </div>

        {/* Check upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <FileText className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Upload Copy of Check
          </label>
          <label
            className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition hover:border-brand-400 ${
              checkFile ? 'border-green-300 bg-green-50' : errors.check ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => {
                setCheckFile(e.target.files?.[0] || null);
                if (errors.check) {
                  const newErrors = { ...errors };
                  delete newErrors.check;
                  setErrors(newErrors);
                }
              }}
            />
            {checkFile ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-700">{checkFile.name}</span>
                <span className="text-xs text-green-500">Click to change</span>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">Upload a photo or scan of the check</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, or PDF — max 10MB</p>
              </>
            )}
          </label>
          {errors.check && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.check}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            The check confirms the seriousness of your offer. It will not be cashed unless your offer is accepted and you proceed with the purchase.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-sm font-bold text-yellow-800 mb-1">How it works</p>
          <ul className="text-xs text-yellow-700 space-y-1.5">
            <li>1. Your offer and check copy are securely sent to the seller</li>
            <li>2. The seller reviews all offers and may contact you</li>
            <li>3. If accepted, you proceed with the standard DLD transfer process</li>
            <li>4. The check is only relevant if you finalize the purchase</li>
          </ul>
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl text-base font-bold transition ${
            submitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200'
          }`}
        >
          {submitting ? 'Submitting Offer...' : 'Submit Offer'}
        </motion.button>

        <p className="text-[10px] text-gray-400 text-center">
          Your offer is confidential. The seller will not see other buyers' offers.
        </p>
      </motion.div>
    </div>
  );
}
