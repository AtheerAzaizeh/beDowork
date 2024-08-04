const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = "your_jwt_secret";

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    if (userType === 'jobSeeker') {
      user = await User.findJobSeekerByEmail(email);
    } else if (userType === 'employeeSeeker') {
      user = await User.findEmployeeSeekerByEmail(email);
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].id, email: user[0].email, userType }, secret, { expiresIn: '1h' });
    return res.status(200).json({ message: "Login successful", token, userType, user_id: user[0].employee_seeker_id || user[0].job_seeker_id });
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json({ message: "Error logging in" });
  }
};
