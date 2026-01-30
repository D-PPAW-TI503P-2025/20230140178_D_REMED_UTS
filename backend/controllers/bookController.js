'use strict';

const { Book } = require('../models');

module.exports = {
  async getAll(req, res, next) {
    try {
      const books = await Book.findAll();
      return res.status(200).json(books);
    } catch (err) {
      next(err); 
    }
  },

  async getById(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.id);

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      return res.json(book);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { title, author, stock } = req.body;

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

      if (stock === undefined || Number(stock) < 0) {
        return res.status(400).json({
          message: 'Stock must be a number and cannot be negative'
        });
      }

      const book = await Book.create({
        title: title.trim(),
        author: author.trim(),
        stock: Number(stock)
      });

      return res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.id);

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      const { title, author, stock } = req.body;

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

      if (stock === undefined || Number(stock) < 0) {
        return res.status(400).json({
          message: 'Stock must be a number and cannot be negative'
        });
      }

      await book.update({
        title: title.trim(),
        author: author.trim(),
        stock: Number(stock)
      });

      return res.json(book);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.id);

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      await book.destroy();

      return res.json({
        message: 'Book deleted'
      });
    } catch (err) {
      next(err);
    }
  }
};
