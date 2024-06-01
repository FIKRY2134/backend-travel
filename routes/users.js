const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { success, error } = require('../helpers/responseHelper');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
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

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(success(users));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(success(user));
    } else {
      res.status(404).json(error('User not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
      const { code, name, phone, email, password } = req.body;
  
      // Check if at least one field is provided
      if (!code && !name && !phone && !email && !password) {
        return res.status(400).json(error('At least one field must be provided'));
      }
  
      // Object to hold the fields to be updated
      const updateFields = {};
  
      if (code) updateFields.code = code;
      if (name) updateFields.name = name;
      if (phone) updateFields.phone = phone;
      if (email) updateFields.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }
  
      const [updated] = await User.update(updateFields, {
        where: { user_id: req.params.id }
      });
  
      if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(success(updatedUser));
      } else {
        res.status(404).json(error('User not found'));
      }
    } catch (err) {
      res.status(400).json(error(err.message));
    }
  });

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json(success(null, 'User deleted successfully'));
    } else {
      res.status(404).json(error('User not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

module.exports = router;
