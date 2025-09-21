import React, { useState } from 'react';
import { Plus, X, MapPin } from 'lucide-react';
import { commonNearbyPlaces, nearbyPlaceTypes } from '../../data/suggestions';

interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

interface NearbyPlacesInputProps {
  places: NearbyPlace[];
  onPlacesChange: (places: NearbyPlace[]) => void;
}

const NearbyPlacesInput: React.FC<NearbyPlacesInputProps> = ({ places, onPlacesChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: '',
    distance: '',
    type: 'General'
  });

  const addPlace = () => {
    if (newPlace.name.trim() && newPlace.distance.trim()) {
      onPlacesChange([...places, { ...newPlace, name: newPlace.name.trim() }]);
      setNewPlace({ name: '', distance: '', type: 'General' });
      setShowForm(false);
    }
  };

  const removePlace = (index: number) => {
    const newPlaces = places.filter((_, i) => i !== index);
    onPlacesChange(newPlaces);
  };

  const addCommonPlace = (place: { name: string; type: string }) => {
    const distance = prompt(`Enter distance to ${place.name}:`);
    if (distance && distance.trim()) {
      onPlacesChange([...places, { ...place, distance: distance.trim() }]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Nearby Places
        </label>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Place
        </button>
      </div>

      {/* Selected Places */}
      {places.length > 0 && (
        <div className="space-y-2">
          {places.map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-medium text-gray-900">{place.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({place.type})</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-red-600">{place.distance}</span>
                <button
                  type="button"
                  onClick={() => removePlace(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Place Form */}
      {showForm && (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-900">Add New Place</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Place name"
              value={newPlace.name}
              onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Distance (e.g., 10 min)"
              value={newPlace.distance}
              onChange={(e) => setNewPlace({ ...newPlace, distance: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <select
              value={newPlace.type}
              onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {nearbyPlaceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={addPlace}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Add Place
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Common Places Quick Add */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Add Common Places:</h4>
        <div className="flex flex-wrap gap-2">
          {commonNearbyPlaces
            .filter(place => !places.some(p => p.name === place.name))
            .slice(0, 8)
            .map((place, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addCommonPlace(place)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
              >
                {place.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyPlacesInput;