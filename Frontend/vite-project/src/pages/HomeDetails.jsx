import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Heart, MapPin, Users, Bed, Bath, DollarSign,
  Star, MessageSquare, CalendarCheck
} from 'lucide-react';

function HomeDetails() {
  const { homeId } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // --- Mock Data Structure for better visual design ---
  // If your actual API response is missing these fields, they will default to a placeholder.
  const mockHome = {
    title: "Luxury Ocean View Villa",
    location: "Malibu, California",
    description: "Experience unparalleled luxury in this stunning villa overlooking the Pacific Ocean. Featuring floor-to-ceiling windows, a private infinity pool, and world-class amenities.",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3.5,
    pricePerNight: 550,
    rating: 4.8,
    reviews: 42,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Private Pool", "Gym Access", "Ocean View"],
    image: "/images/mock_villa.jpg", // Placeholder if fetching fails
  };

  useEffect(() => {
    // We use a small delay to simulate network latency, making the loading state visible
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/homes/${homeId}`);
        const data = await res.json();
        
        // Merge fetched data with mock data (if your API is missing fields)
        setHome({ ...mockHome, ...data }); 
      } catch (err) {
        console.error("Error fetching home:", err);
        // Fallback to mock data on error, or set null if you prefer strict empty state
        setHome(mockHome); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [homeId]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-xl text-gray-600 animate-pulse">Loading amazing details...</p>
        </div>
    );
  }
  if (!home) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-2xl text-red-500">Home listing not found. 😔</p>
        </div>
    );
  }

  // Helper to get spec array for easy mapping
  const specs = [
    { icon: Users, label: 'Guests', value: home.guests },
    { icon: Bed, label: 'Bedrooms', value: home.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: home.bathrooms },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* 1. Header and Favorite Button */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
              {home.title}
            </h1>
            <div className="flex items-center text-lg text-gray-500 font-medium">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              <span>{home.location}</span>
              {home.rating && (
                <div className="ml-6 flex items-center text-yellow-600">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400 mr-1" />
                    <span className="font-bold">{home.rating.toFixed(1)}</span>
                    <span className="text-gray-400 font-normal ml-1">({home.reviews} reviews)</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110
              ${isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-gray-400 hover:text-red-500'
              }
            `}
            aria-label="Toggle favorite"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
        </header>

        {/* 2. Image Gallery (Simple single image for now) */}
        <div className="relative mb-12">
            <img
                src={home.image ? `http://localhost:5000${home.image}` : "https://placehold.co/1200x600/FEE2E2/B91C1C?text=Premium+Property+Image"}
                alt={home.title}
                className="w-full h-[450px] object-cover rounded-3xl shadow-2xl transition duration-500 hover:shadow-3xl"
            />
        </div>

        {/* 3. Main Content Grid (Description + Booking Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details & Description */}
          <div className="lg:col-span-2">

            {/* A. Specs/Features Bar */}
            <div className="flex justify-start space-x-8 border-b border-gray-200 pb-6 mb-8">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center text-gray-700">
                  <spec.icon className="w-6 h-6 mr-2 text-blue-500" />
                  <div className="font-semibold">
                    <span className="text-xl">{spec.value}</span>
                    <span className="text-sm font-medium ml-1 text-gray-500">{spec.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* B. Description */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">About This Home</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{home.description}</p>
            
            {/* C. Amenities */}
            {home.amenities && home.amenities.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">What This Place Offers</h2>
                    <ul className="grid grid-cols-2 gap-3 text-gray-700 mb-8">
                        {home.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center">
                                <span className="text-green-500 mr-2">✔</span>
                                {amenity}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* D. Host Section (Placeholder) */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    H
                </div>
                <div>
                    <p className="font-semibold text-gray-800">Hosted by Jane Doe</p>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contact Host
                    </button>
                </div>
            </div>

          </div>

          {/* Right Column: Booking Panel (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 p-6 bg-white rounded-xl shadow-2xl border-2 border-red-100">
              
              <div className="flex items-end justify-between border-b pb-4 mb-4">
                <div className="text-4xl font-extrabold text-red-600">
                  ${home.pricePerNight}
                </div>
                <span className="text-lg text-gray-500 font-medium"> / night</span>
              </div>

              {/* Placeholder Booking Form/Inputs */}
              <div className="space-y-3 mb-6">
                <input
                  type="date"
                  placeholder="Check In"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="date"
                  placeholder="Check Out"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">
                    <option>2 Guests</option>
                    <option>{home.guests} Guests</option>
                </select>
              </div>

              {/* Booking Button (Call to Action) */}
              <button className="w-full py-4 bg-red-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-[1.01] flex items-center justify-center space-x-2">
                <CalendarCheck className="w-6 h-6" />
                <span>Reserve Now</span>
              </button>

              {/* Price Breakdown (Placeholder) */}
              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>${home.pricePerNight} x 5 nights</span>
                  <span>$2750</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold text-gray-800">
                  <span>Total</span>
                  <span>$2900</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default HomeDetails;