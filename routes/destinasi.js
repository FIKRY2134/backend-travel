const express = require('express');
const { Destinasi } = require('../models');
const { success, error } = require('../helpers/responseHelper');
const { saveBase64Image } = require('../helpers/fileHelper');
const router = express.Router();

// Create a new destinasi
router.post('/', async (req, res) => {
  try {
    const { name, daerah, negara, alamat, images, deskripsi } = req.body;

    // Save base64 image and get URL
    const imageUrl = saveBase64Image(images);

    // Create new destinasi
    const newDestinasi = await Destinasi.create({ name, daerah, negara, alamat, image_url: imageUrl, deskripsi });
    res.status(201).json(success(newDestinasi));
  } catch (err) {
    res.status(400).json(error(err.message));
  }
});

// Get all destinasi
router.get('/', async (req, res) => {
  try {
    const destinasi = await Destinasi.findAll();
    res.status(200).json(success(destinasi));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Get a destinasi by ID
router.get('/:id', async (req, res) => {
  try {
    const destinasi = await Destinasi.findByPk(req.params.id);
    if (destinasi) {
      res.status(200).json(success(destinasi));
    } else {
      res.status(404).json(error('Destinasi not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Update a destinasi
router.put('/:id', async (req, res) => {
    try {
      const { name, daerah, negara, alamat, images, deskripsi } = req.body;
  
      // Check if at least one field is provided
      if (!name && !daerah && !negara && !alamat && !images && !deskripsi) {
        return res.status(400).json(error('At least one field must be provided'));
      }
  
      // Object to hold the fields to be updated
      const updateFields = {};
  
      if (name) updateFields.name = name;
      if (daerah) updateFields.daerah = daerah;
      if (negara) updateFields.negara = negara;
      if (alamat) updateFields.alamat = alamat;
      if (deskripsi) updateFields.deskripsi = deskripsi;
  
      // Save base64 image and get URL if images is provided
      if (images) {
        const imageUrl = saveBase64Image(images);
        updateFields.image_url = imageUrl;
      }
  
      const [updated] = await Destinasi.update(updateFields, {
        where: { destinasi_id: req.params.id }
      });
  
      if (updated) {
        const updatedDestinasi = await Destinasi.findByPk(req.params.id);
        res.status(200).json(success(updatedDestinasi));
      } else {
        res.status(404).json(error('Destinasi not found'));
      }
    } catch (err) {
      res.status(400).json(error(err.message));
    }
  });

// Delete a destinasi
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Destinasi.destroy({
      where: { destinasi_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json(success(null, 'Destinasi deleted successfully'));
    } else {
      res.status(404).json(error('Destinasi not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

module.exports = router;
