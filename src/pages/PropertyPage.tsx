import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Bed, Bath, Maximize, Building2, Shield, Phone,
  ChevronRight, Calendar, Car, Layers, CheckCircle,
  X, ChevronLeft,
} from 'lucide-react';
import { MOCK_PROPERTIES, MOCK_BUYERS } from '../data/properties';
import { PopularityMeter } from '../components/visual/PopularityMeter';
import { OfferAvatars } from '../components/visual/OfferAvatars';
import type { AuthState } from '../App';

interface PropertyPageProps {
  auth: AuthState;
}

const AMENITY_ICONS: Record<string, string> = {
  pool: '🏊', gym: '🏋️', concierge: '🛎️', playground: '🛝', bbq: '🍖',
  spa: '💆', beach: '🏖️', shop: '🛍️', cinema: '🎬', smart: '🤖',
  boat: '⛵', parking: '🅿️', staff: '👨‍🍳', elevator: '🛗', lounge: '🍸',
  service: '🧹', security: '🔒', park: '🌳', school: '🎓',
};

export function PropertyPage({ auth }: PropertyPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'location'>('overview');

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Property not found</p>
        <Link to="/" className="text-brand-600 font-medium mt-2 inline-block">Back to properties</Link>
      </div>
    );
  }

  const formatPrice = (price: number) => `AED ${price.toLocaleString()}`;

  const handleMakeOffer = () => {
    if (!auth.isRegistered) {
      navigate('/register', { state: { returnTo: `/offer/${property.id}` } });
    } else {
      navigate(`/offer/${property.id}`);
    }
  };

  return (
    <>
      {/* Fullscreen gallery modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-white/60 text-sm">{selectedImage + 1} / {property.images.length}</span>
              <button onClick={() => setShowGallery(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative px-4">
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <img
                src={property.images[selectedImage]}
                alt=""
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(Math.min(property.images.length - 1, selectedImage + 1))}
                className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                    selectedImage === i ? 'border-white' : 'border-transparent opacity-50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-4 pb-32 md:pb-6">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition">
          <ArrowLeft className="w-4 h-4" />
          All Properties
        </Link>

        {/* Image Gallery */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
            {/* Main image */}
            <div
              className="md:col-span-2 md:row-span-2 relative cursor-pointer group aspect-[16/10] md:aspect-auto"
              onClick={() => { setSelectedImage(0); setShowGallery(true); }}
            >
              <img src={property.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/60 text-white text-xs rounded-full font-medium">
                {property.images.length} photos
              </div>
            </div>
            {/* Side images */}
            {property.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="hidden md:block relative cursor-pointer group aspect-[16/10]"
                onClick={() => { setSelectedImage(i + 1); setShowGallery(true); }}
              >
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Property Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + quick stats */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                  Accepting Offers
                </span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize">
                  {property.type}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{property.title}</h1>
              <p className="flex items-center gap-1.5 text-gray-500 mb-1">
                <MapPin className="w-4 h-4" />
                {property.location}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-gray-400">
                <Building2 className="w-4 h-4" />
                {property.projectInfo.projectName} by {property.projectInfo.developer}
              </p>
            </div>

            {/* Key stats bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 py-4 px-5 bg-white rounded-2xl border border-gray-100">
              {property.bedrooms > 0 ? (
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-brand-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{property.bedrooms} Bedrooms</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-brand-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Studio</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-brand-500" />
                <p className="text-sm font-bold text-gray-900">{property.bathrooms} Bathrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-5 h-5 text-brand-500" />
                <p className="text-sm font-bold text-gray-900">{property.sqft.toLocaleString()} sqft</p>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-500" />
                <p className="text-sm font-bold text-gray-900">Floor {property.projectInfo.unitFloor || 'G'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-brand-500" />
                <p className="text-sm font-bold text-gray-900">{property.projectInfo.parkingSpaces} Parking</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(['overview', 'details', 'location'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition capitalize ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">About This Property</h2>
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Amenities & Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {property.amenities.map((a) => (
                        <div key={a.name} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                          <span className="text-xl">{AMENITY_ICONS[a.icon] || '✨'}</span>
                          <span className="text-sm text-gray-700 font-medium">{a.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floor plan */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Floor Plan</h2>
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                      <img
                        src={property.floorPlanImage}
                        alt="Floor plan"
                        className="max-h-80 object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Unit details */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Unit Specifications</h2>
                    <div className="divide-y divide-gray-100">
                      {property.unitDetails.map((d) => (
                        <div key={d.label} className="flex items-center justify-between py-3">
                          <span className="text-sm text-gray-500">{d.label}</span>
                          <span className="text-sm font-bold text-gray-900">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Project Information</h2>
                    <div className="divide-y divide-gray-100">
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Developer</span>
                        <span className="text-sm font-bold text-gray-900">{property.projectInfo.developer}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Project</span>
                        <span className="text-sm font-bold text-gray-900">{property.projectInfo.projectName}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Completion Year</span>
                        <span className="text-sm font-bold text-gray-900">{property.projectInfo.completionYear}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Total Units in Building</span>
                        <span className="text-sm font-bold text-gray-900">{property.projectInfo.totalUnits}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Building Floors</span>
                        <span className="text-sm font-bold text-gray-900">{property.projectInfo.buildingFloors}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Title Deed</span>
                        <span className={`text-sm font-bold ${property.projectInfo.titleDeedReady ? 'text-green-600' : 'text-orange-500'}`}>
                          {property.projectInfo.titleDeedReady ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Tenure</span>
                        <span className="text-sm font-bold text-gray-900">
                          {property.projectInfo.freehold ? 'Freehold' : 'Leasehold'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500">Service Charge</span>
                        <span className="text-sm font-bold text-gray-900">
                          AED {property.projectInfo.serviceCharge}/sqft/year
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'location' && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Location</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{property.locationInfo.description}</p>

                    {/* Map placeholder */}
                    <div className="bg-gray-100 rounded-xl aspect-[16/9] flex items-center justify-center mb-6">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">{property.location}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {property.locationInfo.coordinates.lat}, {property.locationInfo.coordinates.lng}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-3">What's Nearby</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {property.locationInfo.nearbyPlaces.map((place) => (
                        <div key={place.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{place.name}</p>
                            <p className="text-xs text-gray-400">{place.type}</p>
                          </div>
                          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                            {place.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Offer Panel (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              {/* Price card */}
              <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Asking Price</p>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                  {formatPrice(property.askingPrice)}
                </p>
                <p className="text-sm text-gray-500 mb-5">
                  AED {property.pricePerSqft.toLocaleString()}/sqft
                </p>

                {/* Popularity meter */}
                <div className="mb-5 p-3 bg-gray-50 rounded-xl">
                  <PopularityMeter
                    offers={property.totalOffers}
                    viewers={14 + property.totalOffers * 5}
                  />
                </div>

                {/* Buyer avatars */}
                {MOCK_BUYERS[property.id] && MOCK_BUYERS[property.id].length > 0 && (
                  <div className="mb-5 p-3 bg-gray-50 rounded-xl">
                    <OfferAvatars buyers={MOCK_BUYERS[property.id]} max={6} size="md" showDetails />
                  </div>
                )}

                <motion.button
                  onClick={handleMakeOffer}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white rounded-xl text-base font-bold transition shadow-lg shadow-brand-200 animate-pulse-glow"
                >
                  {auth.isRegistered ? 'Submit Your Offer' : 'Register & Make Offer'}
                </motion.button>

                {!auth.isRegistered && (
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Emirates ID required to submit an offer
                  </p>
                )}
              </div>

              {/* Agent card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-medium mb-3">Listed By</p>
                <div className="flex items-center gap-3 mb-4">
                  <img src={property.agent.avatar} alt="" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-gray-900">{property.agent.name}</p>
                      {property.agent.verified && <Shield className="w-4 h-4 text-brand-600" />}
                    </div>
                    <p className="text-xs text-gray-500">{property.agent.company}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>RERA: {property.agent.rera}</p>
                  <p>{property.agent.totalListings} active listings</p>
                </div>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition"
                >
                  <Phone className="w-4 h-4" />
                  {property.agent.phone}
                </a>
              </div>

              {/* Listed date */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-500">
                <Calendar className="w-4 h-4" />
                Listed {property.listedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-gray-400">Asking Price</p>
            <p className="text-lg font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{formatPrice(property.askingPrice)}</p>
          </div>
          <motion.button
            onClick={handleMakeOffer}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-brand-600 to-violet-600 text-white rounded-xl font-bold transition shadow-lg shadow-brand-200"
          >
            {auth.isRegistered ? 'Make Offer' : 'Register & Offer'}
          </motion.button>
        </div>
      </div>
    </>
  );
}
