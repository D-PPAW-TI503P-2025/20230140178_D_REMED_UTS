'use strict';

const { Book, BorrowLog, sequelize } = require('../models');

module.exports = {
  // POST /api/borrow
  async borrowBook(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const role = req.headers['x-user-role'];
      const userId = req.headers['x-user-id'];

      // VALIDASI ROLE
      if (!role) {
        return res.status(401).json({
          message: 'x-user-role header is required'
        });
      }

      if (role !== 'user') {
        return res.status(403).json({
          message: 'Only user can borrow books'
        });
      }

      // VALIDASI USER ID
      if (!userId) {
        return res.status(400).json({
          message: 'x-user-id header is required'
        });
      }

      const { bookId, latitude, longitude } = req.body;

      // VALIDASI BODY
      if (!bookId) {
        return res.status(400).json({
          message: 'bookId is required'
        });
      }

      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          message: 'latitude and longitude are required'
        });
      }

      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({
          message: 'latitude and longitude must be numbers'
        });
      }

      // CEK BUKU
      const book = await Book.findByPk(bookId, { transaction });

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      // CEK STOK
     if (book.stock < 1) {
        return res.status(400).json({
            message: 'Book out of stock'
        });
    }
    // KURANGI STOK
    await book.update(
        { stock: book.stock - 1 },
        { transaction }
    );

      // SIMPAN LOG PEMINJAMAN
      const borrowLog = await BorrowLog.create({
        userId,
        bookId,
        borrowDate: new Date(),
        latitude,
        longitude
      }, { transaction });

      await transaction.commit();

      res.status(201).json({
        message: 'Book borrowed successfully',
        data: borrowLog
      });

    } catch (err) {
      await transaction.rollback();
      res.status(500).json({
        message: err.message
      });
    }
  }
};