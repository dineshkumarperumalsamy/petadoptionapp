import React from 'react';
import { X, MapPin, Calendar } from 'lucide-react';
import { Pet } from '../types';

interface PetDetailsProps {
  pet: Pet;
  onClose: () => void;
}

export function PetDetails({ pet, onClose }: PetDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{pet.name}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold">{pet.breed}</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar size={18} className="mr-2" />
                  <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={18} className="mr-2" />
                  <span>{pet.location}</span>
                </div>
              </div>
              <p className="text-gray-700">{pet.description}</p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Adopt {pet.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}