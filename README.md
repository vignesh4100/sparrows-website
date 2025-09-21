# LandVest - Real Estate Plot Investment Platform

A modern React-based real estate platform for managing and showcasing land/plot investments with Firebase Firestore integration.

## Features

### Frontend
- **Modern Design**: Clean, professional UI with Tailwind CSS
- **Responsive Layout**: Mobile-first design that works on all devices
- **Project Showcase**: Dynamic project listings with detailed information
- **Interactive Forms**: Enquiry forms and contact functionality
- **Image Galleries**: Multiple images per project with navigation

### Admin Panel
- **Secure Authentication**: Simple admin login system
- **Project Management**: Full CRUD operations for projects
- **Real-time Data**: Live updates from Firestore database
- **Dashboard Analytics**: Project statistics and recent activity
- **Form Validation**: Comprehensive input validation and error handling

### Database Integration
- **Firebase Firestore**: Real-time NoSQL database
- **Structured Data**: Consistent project data structure
- **Image Management**: Multiple image URLs per project
- **Timestamp Tracking**: Created and updated timestamps
- **Query Optimization**: Efficient data fetching and filtering

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Project Structure

```
src/
├── components/           # React components
│   ├── admin/           # Admin panel components
│   ├── Hero.tsx         # Landing page hero section
│   ├── Projects.tsx     # Project listings
│   ├── ProjectDetail.tsx # Individual project details
│   └── ...
├── config/              # Configuration files
│   └── firebase.ts      # Firebase configuration
├── services/            # API services
│   ├── projectService.ts # Firestore operations
│   └── seedData.ts      # Sample data seeding
├── types/               # TypeScript type definitions
│   └── Project.ts       # Project interface
└── ...
```

## Setup Instructions

### 0. Environment Configuration

1. Copy `.env.example` to `.env`
2. Update the environment variables with your actual values:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:
- Firebase credentials from your Firebase project
- Cloudinary cloud name and upload preset
- Contact information and app branding

### 0. Cloudinary Configuration (for Image Upload)

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your Cloudinary Dashboard
3. Create an upload preset:
   - Go to Settings → Upload → Upload presets
   - Click "Add upload preset"
   - Set preset name to `landvest_uploads`
   - Set signing mode to "Unsigned"
   - Save the preset
4. Update the `.env` file with your Cloudinary configuration:
   - Set `VITE_CLOUDINARY_CLOUD_NAME` to your actual cloud name
   - Set `VITE_CLOUDINARY_UPLOAD_PRESET` to `landvest_uploads`

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your Firebase configuration
4. Update the `.env` file with your Firebase credentials

### 2. Firestore Security Rules

Set up Firestore security rules to allow public read access to projects:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to projects collection
    match /projects/{document} {
      allow read: if true; // Allow all users to read projects
      allow write: if true; // Disable writes from client (use admin panel only)
    }
    
    // Allow public read access to blogs collection
    match /blogs/{document} {
      allow read: if true; // Allow all users to read blogs
      allow write: if true; // Disable writes from client (use admin panel only)
    }
  }
}

**Important**: After updating your Firebase configuration, make sure to:
1. Go to Firebase Console → Firestore Database → Rules
2. Replace the default rules with the rules above
3. Click "Publish" to apply the changes

### 3. Seed Sample Data

To populate your database with sample projects, you can use the seeding function:

```typescript
import { seedDatabase } from './src/services/seedData';
import { seedBlogDatabase } from './src/services/seedBlogData';

// Call these functions once to populate your database
seedDatabase();
seedBlogDatabase();
```

### 4. Admin Access

- **Username**: `admin`
- **Password**: `admin123`

## Data Structure

### Project Interface

```typescript
interface Project {
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
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

The application is configured for Netlify deployment with automatic builds from the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.