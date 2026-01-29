'use strict';

const { Book } = require('../models');

module.exports = {
  // GET /api/books
  async getAll(req, res) {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET /api/books/:id
  async getById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // POST /api/books (admin)
  async create(req, res) {
    try {
      const { title, author, stock } = req.body;

      // VALIDASI
      if (!title || title.trim() === '') {
        return res.status(400).json({
          message: 'Title is required and cannot be empty'
        });
      }

      if (!author || author.trim() === '') {
        return res.status(400).json({
          message: 'Author is required and cannot be empty'
        });
      }

      if (stock === undefined || stock < 0) {
        return res.status(400).json({
          message: 'Stock must be a number and cannot be negative'
        });
      }

      const book = await Book.create({ title, author, stock });
      res.status(201).json(book);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // PUT /api/books/:id (admin)
  async update(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const { title, author, stock } = req.body;

      // VALIDASI
      if (!title || title.trim() === '') {
        return res.status(400).json({
          message: 'Title is required and cannot be empty'
        });
      }

      if (!author || author.trim() === '') {
        return res.status(400).json({
          message: 'Author is required and cannot be empty'
        });
      }

      if (stock === undefined || stock < 0) {
        return res.status(400).json({
          message: 'Stock must be a number and cannot be negative'
        });
      }

      await book.update({ title, author, stock });
      res.json(book);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE /api/books/:id (admin)
  async remove(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      await book.destroy();
      res.json({ message: 'Book deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};