import Home from "../models/homes.js";
// import User from "../models/user.js"
import  Favourite  from "../models/Favourites.js"
import User from "../models/user.js"
// Add Home Controller
export const addHome = async (req, res) => {
  try {
    const { location, title, pricePerNight, description, guests, bedrooms, bathrooms } = req.body;

    const newHome = new Home({
      location,
      title,
      pricePerNight,
      description,
      guests,
      bedrooms,
      bathrooms,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newHome.save();
    res.status(201).json({ message: "Home added successfully", home: newHome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving home" });
  }
};

// Get All Homes Controller
export const getHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching homes" });
  }
};


export const getHomeById = async (req, res) => {
  try {
    const { homeId } = req.params;
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.json(home);
  } catch (err) {
    console.error("Error fetching home:", err);
    res.status(500).json({ message: "Error fetching home" });
  }
};


// Add a home to favorites
// controllers/home.js

export const toggleFavourite = async (req, res) => {
  try {
    const userId = req.session.user?._id;
    const homeId = req.params.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.favourites.indexOf(homeId);

    if (index === -1) {
      user.favourites.push(homeId);
      await user.save();
      return res.json({ message: "Added to favourites" });
    } else {
      user.favourites.splice(index, 1);
      await user.save();
      return res.json({ message: "Removed from favourites" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all favourite homes
// controllers/home.js

export const getUserFavourites = async (req, res) => {
  try {
    const userId = req.session.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).populate("favourites");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favourites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Update the home

export const updateHome = async (req, res) => {
  try {
    const { id } = req.params;

    // Merge body and image if uploaded
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`; // adjust path as per your setup
    }

    // Convert numeric fields if necessary
    updateData.guests = Number(updateData.guests);
    updateData.bedrooms = Number(updateData.bedrooms);
    updateData.bathrooms = Number(updateData.bathrooms);
    updateData.pricePerNight = Number(updateData.pricePerNight);

    const updatedHome = await Home.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedHome);
  } catch (err) {
    res.status(500).json({ message: "Error updating home", error: err.message });
  }
};

// delete the  home 


export const deleteHome = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the home by ID
    const deletedHome = await Home.findByIdAndDelete(id);
    if (!deletedHome) {
      return res.status(404).json({ message: "Home not found" });
    }

    // ✅ Remove this home from all users' favourites arrays
    await User.updateMany(
      { favourites: id },
      { $pull: { favourites: id } }
    );

    res.status(200).json({ message: "Home deleted successfully" });
  } catch (err) {
    console.error("Error deleting home:", err);
    res.status(500).json({ message: "Error deleting home", error: err.message });
  }
};
