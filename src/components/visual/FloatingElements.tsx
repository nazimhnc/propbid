import { motion } from 'framer-motion';

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Gradient blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-10 -left-20 w-60 h-60 bg-pink-200/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-violet-200/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      {/* Floating 2D buildings */}
      <motion.div
        className="absolute top-8 right-[10%] hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          <rect x="10" y="20" width="60" height="80" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
          <rect x="20" y="30" width="12" height="12" rx="2" fill="#93c5fd" />
          <rect x="48" y="30" width="12" height="12" rx="2" fill="#93c5fd" />
          <rect x="20" y="52" width="12" height="12" rx="2" fill="#93c5fd" />
          <rect x="48" y="52" width="12" height="12" rx="2" fill="#93c5fd" />
          <rect x="30" y="76" width="20" height="24" rx="4" fill="#60a5fa" />
          <rect x="25" y="8" width="30" height="12" rx="4" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Floating key */}
      <motion.div
        className="absolute top-24 left-[8%] hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="18" cy="18" r="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="18" cy="18" r="5" fill="white" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="28" y="15" width="20" height="6" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="40" y="21" width="6" height="8" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Floating document */}
      <motion.div
        className="absolute bottom-16 right-[15%] hidden md:block"
        animate={{ y: [0, 12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <svg width="45" height="55" viewBox="0 0 45 55" fill="none">
          <rect x="2" y="2" width="38" height="48" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
          <rect x="10" y="12" width="22" height="3" rx="1.5" fill="#86efac" />
          <rect x="10" y="20" width="18" height="3" rx="1.5" fill="#86efac" />
          <rect x="10" y="28" width="22" height="3" rx="1.5" fill="#86efac" />
          <circle cx="37" cy="5" r="8" fill="#22c55e" />
          <path d="M33 5L36 8L41 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Floating coin/money */}
      <motion.div
        className="absolute top-40 right-[5%] hidden lg:block"
        animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="20" y="26" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">$</text>
        </svg>
      </motion.div>

      {/* Small floating circles */}
      <motion.div
        className="absolute top-16 left-[30%] w-3 h-3 bg-brand-300 rounded-full opacity-60"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-32 right-[30%] w-2 h-2 bg-pink-300 rounded-full opacity-60"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-24 left-[20%] w-4 h-4 bg-violet-300 rounded-full opacity-40"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
