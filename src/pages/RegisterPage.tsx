import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Upload, User, Mail, Phone, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import type { AuthState } from '../App';

interface RegisterPageProps {
  onRegister: (auth: AuthState) => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = (location.state as any)?.returnTo || '/';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    emiratesId: '',
  });
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.emiratesId.trim()) e.emiratesId = 'Emirates ID number is required';
    if (!idFront) e.idFront = 'Please upload the front of your Emirates ID';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    // Simulate registration
    setTimeout(() => {
      onRegister({
        isRegistered: true,
        user: {
          fullName: form.fullName,
          email: form.email,
          emiratesId: form.emiratesId,
        },
      });
      setSubmitting(false);
      navigate(returnTo);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Register to Make Offers</h1>
            <p className="text-sm text-gray-500">Verify your identity to start submitting offers</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 space-y-5">
        {/* Why register */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm font-bold text-blue-800 mb-1">Why do we need your Emirates ID?</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            To ensure all offers are genuine and from verified buyers, we require Emirates ID verification.
            Your information is encrypted and only shared with the seller when you submit an offer.
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <User className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Full Name (as on Emirates ID)
          </label>
          <input
            type="text"
            placeholder="e.g., Ahmed Mohammed Al-Rashid"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.fullName ? 'ring-2 ring-red-300' : ''
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Mail className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.email ? 'ring-2 ring-red-300' : ''
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Phone className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+971 50 123 4567"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.phone ? 'ring-2 ring-red-300' : ''
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        </div>

        {/* Emirates ID Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <CreditCard className="w-4 h-4 inline mr-1.5 text-gray-400" />
            Emirates ID Number
          </label>
          <input
            type="text"
            placeholder="784-XXXX-XXXXXXX-X"
            value={form.emiratesId}
            onChange={(e) => handleChange('emiratesId', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.emiratesId ? 'ring-2 ring-red-300' : ''
            }`}
          />
          {errors.emiratesId && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.emiratesId}</p>}
        </div>

        {/* Emirates ID Upload — Front */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Emirates ID — Front Side
          </label>
          <label
            className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:border-brand-400 ${
              idFront ? 'border-green-300 bg-green-50' : errors.idFront ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setIdFront(e.target.files?.[0] || null);
                if (errors.idFront) {
                  const newErrors = { ...errors };
                  delete newErrors.idFront;
                  setErrors(newErrors);
                }
              }}
            />
            {idFront ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">{idFront.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload front of Emirates ID</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, or PDF</p>
              </>
            )}
          </label>
          {errors.idFront && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.idFront}</p>}
        </div>

        {/* Emirates ID Upload — Back (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Emirates ID — Back Side <span className="text-gray-400">(optional)</span>
          </label>
          <label
            className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:border-brand-400 ${
              idBack ? 'border-green-300 bg-green-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setIdBack(e.target.files?.[0] || null)}
            />
            {idBack ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">{idBack.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload back of Emirates ID</p>
              </>
            )}
          </label>
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
          {submitting ? 'Verifying...' : 'Register & Verify Identity'}
        </motion.button>

        <p className="text-[10px] text-gray-400 text-center leading-relaxed">
          By registering, you agree to our Terms of Service and Privacy Policy.
          Your Emirates ID is securely stored and only shared with sellers when you submit an offer.
        </p>
      </div>
    </div>
  );
}
