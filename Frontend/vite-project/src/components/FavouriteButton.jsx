import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const FavouriteButton = ({ homeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavourite = async (e) => {
    e.stopPropagation(); // Prevent parent card click
    try {
      const res = await fetch(`http://localhost:5000/api/favourites/${homeId}`, {
        method: "POST",
      });
      if (res.ok) {
        setIsFavorite(!isFavorite);
        navigate("/favourites"); // redirect to favourites page
      } else {
        console.error("Failed to add favourite");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <button
      onClick={handleFavourite}
      className={`flex items-center justify-center w-full mt-3 px-4 py-2 font-semibold rounded-lg shadow-md transition duration-150 ${
        isFavorite
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Heart
        className={`w-5 h-5 mr-2 ${isFavorite ? "fill-red-500 stroke-red-500" : ""}`}
      />
      {isFavorite ? "Remove Favourite" : "Add to Favourites"}
    </button>
  );
};

export default FavouriteButton;
