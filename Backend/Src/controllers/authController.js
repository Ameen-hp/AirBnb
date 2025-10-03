import bcrypt from "bcrypt";
import User from "../models/user.js";

// ----------------- SIGNUP -----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    // 🚫 don’t set session here
    // req.session.user = {...}

    // tell frontend to login after signup
    res.status(201).json({
      message: "Signup successful. Please login to continue.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // store user in session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    };

    return res.json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ----------------- LOGOUT -----------------
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid", { path: "/" }); // make sure cookie clears
    return res.json({ message: "Logged out successfully" });
  });
};

// ----------------- GET CURRENT USER -----------------
export const getSession = (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  return res.status(401).json({ message: "Not authenticated" });
};
