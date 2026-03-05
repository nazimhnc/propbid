export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  area: string;
  community: string;
  type: 'apartment' | 'villa' | 'penthouse' | 'townhouse' | 'land' | 'office';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  pricePerSqft: number;
  image: string;
  images: string[];
  floorPlanImage: string;
  description: string;
  highlights: string[];
  amenities: Amenity[];
  projectInfo: ProjectInfo;
  unitDetails: UnitDetail[];
  locationInfo: LocationInfo;
  askingPrice: number;
  totalOffers: number;
  status: 'accepting_offers' | 'under_review' | 'sold';
  listedAt: Date;
  agent: Agent;
}

export interface ProjectInfo {
  developer: string;
  projectName: string;
  completionYear: number;
  totalUnits: number;
  buildingFloors: number;
  unitFloor: number;
  parkingSpaces: number;
  serviceCharge: number; // per sqft per year
  titleDeedReady: boolean;
  freehold: boolean;
}

export interface UnitDetail {
  label: string;
  value: string;
}

export interface LocationInfo {
  description: string;
  nearbyPlaces: NearbyPlace[];
  coordinates: { lat: number; lng: number };
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface Agent {
  name: string;
  company: string;
  avatar: string;
  phone: string;
  verified: boolean;
  rera: string; // RERA license number
  totalListings: number;
}

export interface Offer {
  id: string;
  propertyId: string;
  buyerName: string;
  amount: number;
  checkImageUrl: string;
  submittedAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  emiratesIdNumber: string;
  emiratesIdFrontUrl: string;
  emiratesIdBackUrl: string;
  verified: boolean;
  registeredAt: Date;
}
