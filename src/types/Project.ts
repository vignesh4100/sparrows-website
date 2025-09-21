export interface Project {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  plotSizes: string;
  status: 'Available' | 'New Launch' | 'Few Left' | 'Sold Out';
  totalPlots: number;
  soldPlots: number;
  description: string;
  images: string[];
  highlights: string[];
  amenities: string[];
  nearbyPlaces: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}