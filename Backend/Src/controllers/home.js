import Home from "../models/homes.js";
// import User from "../models/user.js"
import  Favourite  from "../models/Favourites.js"
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
export const addFavourite = async (req, res) => {
  try {
    const { id } = req.params; // home ID
    let fav = await Favourite.findOne(); // Using single collection for now

    if (!fav) {
      fav = await Favourite.create({ homes: [id] });
    } else {
      // If already in favourites, remove it, otherwise add it
      if (fav.homes.includes(id)) {
        fav.homes.pull(id);
      } else {
        fav.homes.push(id);
      }
      await fav.save();
    }

    res.status(200).json({ success: true, favourites: fav.homes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all favourite homes
export const getFavourites = async (req, res) => {
  try {
    const fav = await Favourite.findOne().populate("homes");
    if (!fav || fav.homes.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(fav.homes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
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

    // Delete home by ID
    const deletedHome = await Home.findByIdAndDelete(id);
    if (!deletedHome) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Delete this home from all users' favourites
    await Favourite.deleteMany({ houseId: id });

    res.status(200).json({ message: "Home deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting home", error: err.message });
  }
};