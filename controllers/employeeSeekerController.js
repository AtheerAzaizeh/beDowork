const EmployeeSeeker = require("../models/employeeSeekerModel");

exports.create = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  const newEmployeeSeeker = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profile_picture: req.file ? req.file.filename : null,
  };

  try {
    const result = await EmployeeSeeker.create(newEmployeeSeeker);
    res.status(201).json({ message: "Employee seeker created", id: result.insertId });
  } catch (err) {
    console.error("Error creating employee seeker:", err);
    res.status(500).json({ message: "Error creating employee seeker" });
  }
};


exports.findAll = async (req, res) => {
  console.log("Fetching all employee seekers");
  try {
    const results = await EmployeeSeeker.findAll();
    console.log("Employee seekers fetched:", results);
    res.json(results);
  } catch (err) {
    console.error("Error fetching employee seekers:", err);
    res.status(500).send("Error fetching employee seekers");
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  console.log(`Fetching employee seeker with id: ${id}`);

  try {
    const result = await EmployeeSeeker.findById(id);
    if (!result) {
      console.log(`Employee seeker with id ${id} not found`);
      res.status(404).send("Employee seeker not found");
      return;
    }
    console.log(`Employee seeker with id ${id} fetched:`, result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching employee seeker:", err);
    res.status(500).send("Error fetching employee seeker");
  }
};

 exports.update = async (req, res) => {
    const id = req.params.id;
    const { username, email, password } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    try {
      const existingEmployeeSeeker = await EmployeeSeeker.findById(id);
      if (!existingEmployeeSeeker) {
        return res.status(404).json({ message: "Employee Seeker not found" });
      }

      const updatedData = {
        username: username || existingEmployeeSeeker.username,
        email: email || existingEmployeeSeeker.email,
        password: password || existingEmployeeSeeker.password,
        profile_picture: profile_picture || existingEmployeeSeeker.profile_picture,
      };

      const result = await EmployeeSeeker.update(id, updatedData);

      res.status(200).json({ message: "Employee Seeker updated successfully", data: result });
    } catch (err) {
      console.error("Error updating Employee Seeker:", err);
      res.status(500).json({ message: "Error updating Employee Seeker" });
    }
  },

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting employee seeker with id: ${id}`);

  try {
    const result = await EmployeeSeeker.delete(id);
    if (result.affectedRows === 0) {
      console.log(`Employee seeker with id ${id} not found`);
      res.status(404).send("Employee seeker not found");
      return;
    }
    console.log(`Employee seeker with id ${id} deleted:`, result);
    res.send("Employee seeker deleted");
  } catch (err) {
    console.error("Error deleting employee seeker:", err);
    res.status(500).send("Error deleting employee seeker");
  }
};
