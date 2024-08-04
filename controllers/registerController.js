const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const saltRounds = 10;

exports.registerJobSeeker = async (req, res) => {
  const { username, email, password, skills } = req.body;
  const profile_picture = req.file ? req.file.buffer : null;

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.createJobSeeker({ 
      username, 
      email, 
      password: hashedPassword, 
      profile_picture, 
      skills 
    });
    res.status(201).json({ message: "Job Seeker registered successfully" });
  } catch (err) {
    console.error("Error registering Job Seeker:", err);
    res.status(500).json({ message: "Error registering Job Seeker" });
  }
};

exports.registerEmployeeSeeker = async (req, res) => {
  const { username, email, password } = req.body;
  const profile_picture = req.file ? req.file.buffer : null;

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.createEmployeeSeeker({ 
      username, 
      email, 
      password: hashedPassword, 
      profile_picture 
    });
    res.status(201).json({ message: "Employee Seeker registered successfully" });
  } catch (err) {
    console.error("Error registering Employee Seeker:", err);
    res.status(500).json({ message: "Error registering Employee Seeker" });
  }
}