import React from "react";
import { Edit, Trash2 } from "lucide-react";

function HostHomeCard({ home, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Home Image */}
      {home.image && (
        <img
          src={`http://localhost:5000${home.image}`}
          alt={home.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        {/* Home Title */}
        <h3 className="text-lg font-semibold text-gray-800">{home.title}</h3>
        {/* Location */}
        <p className="text-gray-500 text-sm">{home.location}</p>
        {/* Price & Details */}
        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
          <span>${home.pricePerNight} / night</span>
          <span>{home.guests} guests • {home.bedrooms} beds • {home.bathrooms} baths</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onEdit(home._id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(home._id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HostHomeCard;
