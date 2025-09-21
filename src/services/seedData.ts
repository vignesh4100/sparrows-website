import { projectService } from './projectService';
import { Project } from '../types/Project';

const sampleProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "Green Valley Plots",
    location: "Sarjapur, Bangalore",
    priceRange: "₹8L - ₹15L",
    plotSizes: "600 - 1200 sq.ft",
    status: "Available",
    totalPlots: 120,
    soldPlots: 45,
    description: "Green Valley Plots is a premium gated community featuring DTCP approved residential plots in the heart of Sarjapur. Located just 15 minutes from Electronic City, this project offers the perfect blend of urban convenience and peaceful living.",
    images: [
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1031584/pexels-photo-1031584.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    highlights: [
      "DTCP Approved Layout",
      "RERA Registered",
      "Clear Title Property",
      "Near IT Corridor",
      "Excellent Connectivity",
      "High Appreciation Potential"
    ],
    amenities: [
      "24/7 Security",
      "Gated Community",
      "Blacktopped Roads",
      "Underground Drainage",
      "Street Lighting",
      "Water Supply",
      "Electricity Connection",
      "Vastu Compliant",
      "Children's Play Area",
      "Landscaped Gardens",
      "Jogging Track",
      "Community Hall"
    ],
    nearbyPlaces: [
      { name: "Electronic City", distance: "15 min", type: "IT Hub" },
      { name: "Sarjapur Main Road", distance: "5 min", type: "Shopping" },
      { name: "Manipal Hospital", distance: "10 min", type: "Healthcare" },
      { name: "Ryan International School", distance: "8 min", type: "Education" },
      { name: "Big Bazaar", distance: "12 min", type: "Shopping" },
      { name: "Outer Ring Road", distance: "20 min", type: "Transport" }
    ]
  },
  {
    name: "Sunrise Residency",
    location: "Tambaram, Chennai",
    priceRange: "₹12L - ₹28L",
    plotSizes: "800 - 1800 sq.ft",
    status: "New Launch",
    totalPlots: 200,
    soldPlots: 12,
    description: "Sunrise Residency offers premium residential plots in the rapidly developing area of Tambaram. With excellent connectivity to Chennai city center and upcoming metro connectivity, this project promises high returns on investment.",
    images: [
      "https://images.pexels.com/photos/1031584/pexels-photo-1031584.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    highlights: [
      "RERA Approved",
      "Metro Connectivity",
      "Vastu Compliant",
      "Bank Loan Available",
      "Clear Title",
      "Prime Location"
    ],
    amenities: [
      "Gated Layout",
      "24/7 Security",
      "Wide Roads",
      "Street Lighting",
      "Water Supply",
      "Electricity",
      "Drainage System",
      "Park Area",
      "Temple",
      "Shopping Complex"
    ],
    nearbyPlaces: [
      { name: "Tambaram Railway Station", distance: "8 min", type: "Transport" },
      { name: "GST Road", distance: "5 min", type: "Main Road" },
      { name: "Apollo Hospital", distance: "12 min", type: "Healthcare" },
      { name: "DAV School", distance: "6 min", type: "Education" },
      { name: "Phoenix MarketCity", distance: "15 min", type: "Shopping" },
      { name: "Chennai Airport", distance: "25 min", type: "Transport" }
    ]
  },
  {
    name: "Metro Park Plots",
    location: "Coimbatore",
    priceRange: "₹6L - ₹18L",
    plotSizes: "500 - 1500 sq.ft",
    status: "Few Left",
    totalPlots: 80,
    soldPlots: 68,
    description: "Metro Park Plots is strategically located in Coimbatore with excellent connectivity to major IT parks and educational institutions. This DTCP approved layout offers affordable plots with modern amenities.",
    images: [
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    highlights: [
      "DTCP Approved",
      "Clear Title",
      "Metro Connectivity",
      "Schools Nearby",
      "IT Parks Close",
      "Affordable Pricing"
    ],
    amenities: [
      "Security",
      "Tar Roads",
      "Street Lights",
      "Water Connection",
      "Power Supply",
      "Drainage",
      "Park",
      "Community Hall",
      "Children's Play Area"
    ],
    nearbyPlaces: [
      { name: "Tidel Park", distance: "10 min", type: "IT Hub" },
      { name: "Avinashi Road", distance: "8 min", type: "Main Road" },
      { name: "KMCH Hospital", distance: "15 min", type: "Healthcare" },
      { name: "PSG College", distance: "12 min", type: "Education" },
      { name: "Fun Mall", distance: "10 min", type: "Shopping" },
      { name: "Coimbatore Junction", distance: "20 min", type: "Transport" }
    ]
  },
  {
    name: "Tech City Plots",
    location: "Electronic City, Bangalore",
    priceRange: "₹15L - ₹35L",
    plotSizes: "1000 - 2400 sq.ft",
    status: "Available",
    totalPlots: 150,
    soldPlots: 87,
    description: "Tech City Plots is located in the heart of Electronic City, Bangalore's premier IT destination. This premium project offers larger plots perfect for building luxury homes in a tech-savvy environment.",
    images: [
      "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1031584/pexels-photo-1031584.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    highlights: [
      "IT Hub Location",
      "High Appreciation",
      "Premium Layout",
      "DTCP Approved",
      "Luxury Amenities",
      "Investment Grade"
    ],
    amenities: [
      "Premium Security",
      "Wide Roads",
      "Street Lighting",
      "Underground Cables",
      "Water Supply",
      "Sewage Treatment",
      "Landscaping",
      "Club House",
      "Swimming Pool",
      "Gym",
      "Tennis Court",
      "Jogging Track"
    ],
    nearbyPlaces: [
      { name: "Infosys Campus", distance: "5 min", type: "IT Hub" },
      { name: "Wipro Campus", distance: "8 min", type: "IT Hub" },
      { name: "Narayana Health", distance: "10 min", type: "Healthcare" },
      { name: "TISB School", distance: "12 min", type: "Education" },
      { name: "Forum Mall", distance: "15 min", type: "Shopping" },
      { name: "Electronic City Metro", distance: "10 min", type: "Transport" }
    ]
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting to seed database...');
    
    for (const project of sampleProjects) {
      const projectId = await projectService.addProject(project);
      if (projectId) {
        console.log(`Added project: ${project.name} with ID: ${projectId}`);
      } else {
        console.error(`Failed to add project: ${project.name}`);
      }
    }
    
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};