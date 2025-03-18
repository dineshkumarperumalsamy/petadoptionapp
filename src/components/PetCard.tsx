import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onClick: (pet: Pet) => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(pet)}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img 
          src={pet.imageUrl} 
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
        <p className="text-gray-600 mb-2">{pet.breed}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
        </div>
        <div className="flex items-center text-gray-500">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{pet.location}</span>
        </div>
      </div>
    </div>
  );
}