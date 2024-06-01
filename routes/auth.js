const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { success, error } = require('../helpers/responseHelper');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { code, name, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json(error('Email already in use'));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ code, name, phone, email, password: hashedPassword });
    res.status(201).json(success(newUser));
  } catch (err) {
    res.status(400).json(error(err.message));
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json(error('User not found'));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json(error('Invalid password'));
    }

    // Respond with user data (excluding password)
    const userData = {
      user_id: user.user_id,
      code: user.code,
      name: user.name,
      phone: user.phone,
      email: user.email,
      created_at: user.created_at
    };

    res.status(200).json(success(userData));
  } catch (err) {
    res.status(400).json(error(err.message));
  }
});

module.exports = router;
