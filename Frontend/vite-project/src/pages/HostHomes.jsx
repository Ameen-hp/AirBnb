import React, { useEffect, useState } from "react";
import HostHomeCard from "../components/HostHomeCard"; // Your card component
import { Home as HomeIcon } from "lucide-react";

function HostHome() {
  const [homes, setHomes] = useState([]);

  // Fetch all homes from backend
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/homes"); // Your backend endpoint
        const data = await res.json();
        setHomes(data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };

    fetchHomes();
  }, []);

  // Delete a home
  const handleDelete = async (homeId) => {
    if (!window.confirm("Are you sure you want to delete this home?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/homes/${homeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHomes((prev) => prev.filter((home) => home._id !== homeId));
      }
    } catch (err) {
      console.error("Error deleting home:", err);
    }
  };

  // Edit a home
  const handleEdit = (homeId) => {
    // Redirect to AddHome page with edit query parameters
    window.location.href = `/addHome?isEdit=true&homeId=${homeId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
          <HomeIcon className="w-8 h-8 text-red-600" />
          <span>Your Homes</span>
        </h2>

        {homes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homes.map((home) => (
              <HostHomeCard
                key={home._id}
                home={home}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No homes found. Add some!</p>
        )}
      </div>
    </div>
  );
}

export default HostHome;
