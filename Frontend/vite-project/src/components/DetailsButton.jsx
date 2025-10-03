import { Link } from "react-router-dom"; // Correct import
import { ChevronRight } from "lucide-react";

const DetailsButton = ({ homeId }) => {
  return (
    <div>
      <Link 
        to={`/homes/${homeId}`} 
        onClick={(e) => e.stopPropagation()} // Prevent parent clicks if needed
        className="inline-flex items-center justify-center w-full mt-3 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 transform hover:shadow-lg"
      >
        View Details
        <ChevronRight className="w-5 h-5 ml-1" />
      </Link>
    </div>
  );
}

export default DetailsButton;
