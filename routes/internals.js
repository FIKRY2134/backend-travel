const express = require('express');
const { Internal } = require('../models');
const { success, error } = require('../helpers/responseHelper');
const router = express.Router();

// Create a new internal
router.post('/', async (req, res) => {
  try {
    const { code, column, value, xs1, xs2, xs3 } = req.body;

    // Create new internal
    const newInternal = await Internal.create({ code, column, value, xs1, xs2, xs3 });
    res.status(201).json(success(newInternal));
  } catch (err) {
    res.status(400).json(error(err.message));
  }
});

// Get all internals
router.get('/', async (req, res) => {
  try {
    const internals = await Internal.findAll();
    res.status(200).json(success(internals));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Get an internal by ID
router.get('/:id', async (req, res) => {
  try {
    const internal = await Internal.findByPk(req.params.id);
    if (internal) {
      res.status(200).json(success(internal));
    } else {
      res.status(404).json(error('Internal not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Update an internal
router.put('/:id', async (req, res) => {
    try {
      const { code, column, value, xs1, xs2, xs3 } = req.body;
  
      // Check if at least one field is provided
      if (!code && !column && !value && !xs1 && !xs2 && !xs3) {
        return res.status(400).json(error('At least one field must be provided'));
      }
  
      // Object to hold the fields to be updated
      const updateFields = {};
  
      if (code) updateFields.code = code;
      if (column) updateFields.column = column;
      if (value) updateFields.value = value;
      if (xs1) updateFields.xs1 = xs1;
      if (xs2) updateFields.xs2 = xs2;
      if (xs3) updateFields.xs3 = xs3;
  
      const [updated] = await Internal.update(updateFields, {
        where: { internal_id: req.params.id }
      });
  
      if (updated) {
        const updatedInternal = await Internal.findByPk(req.params.id);
        res.status(200).json(success(updatedInternal));
      } else {
        res.status(404).json(error('Internal not found'));
      }
    } catch (err) {
      res.status(400).json(error(err.message));
    }
  });

// Delete an internal
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Internal.destroy({
      where: { internal_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json(success(null, 'Internal deleted successfully'));
    } else {
      res.status(404).json(error('Internal not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

module.exports = router;
