import React, { useEffect, useState } from "react";
import { MapPin, Heart, Star, Bed, Bath } from "lucide-react";
import { Link } from "react-router-dom";
import DetailsButton from "../components/DetailsButton";
function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/favourites"); // Backend route
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorite homes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = (homeId) => {
    // Optional: handle removing from favorites here
    console.log("Toggle favorite for:", homeId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-xl">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
          <Heart className="w-8 h-8 text-red-600" />
          <span>My Favorite Homes</span>
        </h2>

        {favorites.length === 0 ? (
          <p className="text-gray-600 text-lg">You have no favorite homes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {favorites.map((home) => {
              const {
                _id,
                title = "Luxury Home",
                location = "Unknown",
                pricePerNight = 0,
                image,
                bedrooms = 3,
                bathrooms = 2,
                rating = 4.5,
              } = home || {};

              return (
                <div
                  key={_id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-[1.03] cursor-pointer"
                >
                  {/* Image + Favorite Button */}
                  <div className="relative">
                    <img
                      src={`http://localhost:5000${image}`}
                      alt={title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x300/FEE2E2/B91C1C?text=Home";
                      }}
                    />
                    <button
                      onClick={() => toggleFavorite(_id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-red-500 shadow-md hover:scale-110 transition"
                    >
                      <Heart className="w-6 h-6 fill-red-500" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
                    <p className="text-sm text-gray-600 flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>{location}</span>
                    </p>
                    <p className="text-xl font-extrabold text-red-600 pt-1">
                      ${pricePerNight}
                      <span className="text-base font-medium text-gray-500"> / night</span>
                    </p>

                    {/* Specs */}
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

                    {/* View Details */}
                     <DetailsButton  homeId={ home._id}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
