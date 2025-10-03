import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    // MATCHES: Home Title field in React state
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    // MATCHES: Location field in React state
    location: { 
        type: String, 
        required: true,
        trim: true 
    },
    pricePerNight: { 
        type: Number, 
        required: true,
        min: 1 // Price must be at least 1
    },
    
    // ADDED: Capacity details collected from the AddHome form
    guests: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    bedrooms: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    bathrooms: { 
        type: Number, 
        required: true, 
        min: 1 
    },

    description: { 
        type: String,
        trim: true 
    },
    
    // Storing the URL path to the image
    image: { 
        type: String 
    }, 
    
    // Default rating set for new homes (0-5 scale)
    rating: { 
        type: Number, 
        default: 0,
        min: 0,
        max: 5
    }
}, { timestamps: true }); // Added timestamps for tracking creation/updates

export default mongoose.model("Home", homeSchema);
