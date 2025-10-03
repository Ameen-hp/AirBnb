import React, { useEffect, useState } from 'react';
// Assuming Link is imported from 'react-router-dom', not 'lucide-react'
import FavouriteButton from '../components/FavouriteButton';
import DetailsButton from '../components/DetailsButton';
import { Link } from 'react-router-dom'; 
import { 
  Search, MapPin, Calendar, Users, Heart, ChevronRight, 
  Home as HomeIcon, Waves, Mountain, Building, Leaf, Compass,
  // Added icons for the new card details
  Bed, Bath, Car, Star 
} from 'lucide-react';


const categories = [
  { name: 'Beach', icon: Waves, color: 'text-blue-500' },
  { name: 'Mountain', icon: Mountain, color: 'text-green-600' },
  { name: 'City', icon: Building, color: 'text-gray-700' },
  { name: 'Farm', icon: Leaf, color: 'text-yellow-700' },
  { name: 'Unique', icon: Compass, color: 'text-red-500' },
];

// --- HELPER COMPONENTS ---
const SearchInput = ({ icon: Icon, placeholder, type = 'text' }) => (
  <div className="relative w-full">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full py-3 pl-10 pr-4 rounded-full border-2 border-gray-100 
                focus:border-red-400 focus:ring-2 focus:ring-red-200 
                transition duration-150 shadow-inner text-sm md:text-base"
    />
  </div>
);

/**
 * ENHANCED HomeCard with Favorite Button and Details Link/Button
 */

const HomeCard = ({ home }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { 
    title = "Luxury Home", 
    location = "Unknown", 
    pricePerNight = 0, 
    image, 
    _id,
    bedrooms = 3, 
    bathrooms = 2,
    rating = 4.5,
  } = home || {};

  // 🔥 Toggle Favorite with API call
  const toggleFavorite = async (e) => {
    e.stopPropagation();

    try {
      const method = isFavorite ? "DELETE" : "POST";

      await fetch(`http://localhost:5000/api/favourites/${_id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important if using sessions/cookies
      });

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favourite:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-[1.03] cursor-pointer">
      
      {/* 🖼 Image */}
      <div className="relative">
        <img 
          src={`http://localhost:5000${image}`} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/400x300/FEE2E2/B91C1C?text=Home"; 
          }}
        />
      </div>
      
      {/* 📄 Details Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        
        {/* 📍 Location */}
        <p className="text-sm text-gray-600 flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-red-400" />
          <span>{location}</span>
        </p>

        {/* 💰 Price */}
        <p className="text-xl font-extrabold text-red-600 pt-1">
          ${pricePerNight}
          <span className="text-base font-medium text-gray-500"> / night</span>
        </p>

        {/* 🛏 Specs */}
        <div className="flex justify-between items-center text-sm pt-2 pb-1 border-b border-gray-100">
          <div className="flex items-center text-gray-600">
            <Bed className="w-4 h-4 mr-1 text-blue-400" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="w-4 h-4 mr-1 text-blue-400" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-yellow-600">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* ❤️ Favourite Button (with text + API) */}
       <div className="p-4">
  {/* Other details */}
  <FavouriteButton homeId={home._id} />
</div>
        {/* 🔗 Details Button */}
         <DetailsButton homeId={home._id} />
      </div>
    </div>
  );
};


const CategoryPill = ({ category }) => (
  <button className="
    flex flex-col items-center p-3 sm:p-4 rounded-xl space-y-1 sm:space-y-2 
    bg-white shadow-md border-2 border-transparent
    hover:border-yellow-400 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105
  ">
    <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${category.color}`} />
    <span className="text-xs sm:text-sm font-semibold text-gray-700">{category.name}</span>
  </button>
);

function HomeList() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/homes");
        const data = await res.json();
        setHomes(data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };
    fetchHomes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- HERO --- */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 pt-16 pb-24 sm:pt-20 sm:pb-32 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Find Your <span className="text-yellow-300">Perfect Stay</span>
          </h1>
          <p className="text-lg sm:text-xl text-red-200 mb-10 max-w-2xl mx-auto">
            Book unique homes, apartments, and experiences with ease.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 sm:p-3 rounded-full shadow-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 max-w-4xl mx-auto border-4 border-red-500/50">
            <div className="flex w-full md:w-3/5 space-x-3">
                <SearchInput icon={MapPin} placeholder="Location" />
                <SearchInput icon={Calendar} placeholder="Dates" type="date" />
            </div>
            <div className="flex w-full md:w-2/5 space-x-3">
                <SearchInput icon={Users} placeholder="Guests" type="number" />
                <button className="w-full md:w-auto px-6 py-3 rounded-full bg-red-600 text-white font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-red-700 active:bg-red-800 transition duration-200 transform hover:scale-[1.02]">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="py-12 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {categories.map((category) => (
              <CategoryPill key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED HOMES (DB) --- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
            <HomeIcon className="w-8 h-8 text-red-600" />
            <span>Featured Homes Near You</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {homes.length > 0 ? (
              homes.map((home) => <HomeCard key={home._id} home={home} />)
            ) : (
              <p className="text-gray-600 col-span-full text-center">No homes available yet. Add some!</p>
            )}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-16 bg-red-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-red-500/50 flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Ready to Share Your Space?</h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Turn your extra space into income and discover new possibilities. Join millions of hosts worldwide.
            </p>
            <button className="flex items-center space-x-3 px-8 py-4 rounded-full text-xl font-bold text-white bg-yellow-400 shadow-lg hover:bg-yellow-500 active:bg-yellow-600 transition duration-300 transform hover:scale-[1.05] focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2">
              <span>Become a Host Today</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeList;