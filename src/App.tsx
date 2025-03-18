import React, { useState, useMemo } from 'react';
import { PawPrint, Search, UserCircle } from 'lucide-react';
import { pets } from './data/pets';
import { PetCard } from './components/PetCard';
import { PetDetails } from './components/PetDetails';
import { AuthModal } from './components/AuthModal';
import { useAuthStore } from './store/authStore';
import type { Pet } from './types';

function App() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const filteredPets = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return pets.filter(pet => 
      pet.name.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query) ||
      pet.type.toLowerCase().includes(query) ||
      pet.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PawPrint className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-3xl font-bold text-gray-900">Pet Adoption</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search pets..."
                  className="w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 hidden md:inline">Welcome, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <UserCircle className="h-5 w-5 mr-2" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No pets found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={setSelectedPet}
              />
            ))}
          </div>
        )}
      </main>

      {selectedPet && (
        <PetDetails
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;