const express = require('express');
const { Review, User, Destinasi } = require('../models');
const { success, error } = require('../helpers/responseHelper');
const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { user_id, destinasi_id, rating, komentar } = req.body;

    // Create new review
    const newReview = await Review.create({ user_id, destinasi_id, rating, komentar });
    res.status(201).json(success(newReview));
  } catch (err) {
    res.status(400).json(error(err.message));
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Destinasi, attributes: ['name'] }
      ]
    });
    res.status(200).json(success(reviews));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Get a review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Destinasi, attributes: ['name'] }
      ]
    });
    if (review) {
      res.status(200).json(success(review));
    } else {
      res.status(404).json(error('Review not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Update a review
router.put('/:id', async (req, res) => {
    try {
      const { user_id, destinasi_id, rating, komentar } = req.body;
  
      // Check if at least one field is provided
      if (!user_id && !destinasi_id && !rating && !komentar) {
        return res.status(400).json(error('At least one field must be provided'));
      }
  
      // Object to hold the fields to be updated
      const updateFields = {};
  
      if (user_id) updateFields.user_id = user_id;
      if (destinasi_id) updateFields.destinasi_id = destinasi_id;
      if (rating) updateFields.rating = rating;
      if (komentar) updateFields.komentar = komentar;
  
      const [updated] = await Review.update(updateFields, {
        where: { review_id: req.params.id }
      });
  
      if (updated) {
        const updatedReview = await Review.findByPk(req.params.id);
        res.status(200).json(success(updatedReview));
      } else {
        res.status(404).json(error('Review not found'));
      }
    } catch (err) {
      res.status(400).json(error(err.message));
    }
  });

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Review.destroy({
      where: { review_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json(success(null, 'Review deleted successfully'));
    } else {
      res.status(404).json(error('Review not found'));
    }
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

module.exports = router;
