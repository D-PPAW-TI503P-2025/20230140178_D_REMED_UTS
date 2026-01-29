'use strict';

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const checkRole = require('../middleware/roleMiddleware');

// Public
router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);

// Admin
router.post('/', checkRole('admin'), bookController.create);
router.put('/:id', checkRole('admin'), bookController.update);
router.delete('/:id', checkRole('admin'), bookController.remove);

module.exports = router;