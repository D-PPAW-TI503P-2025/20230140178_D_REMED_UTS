'use strict';

const { Book, BorrowLog, sequelize } = require('../models');

module.exports = {
  async borrowBook(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const role = req.headers['x-user-role'];
      const userId = req.headers['x-user-id'];

      if (!role) {
        await transaction.rollback();
        return res.status(401).json({
          message: 'x-user-role header is required'
        });
      }

      if (role !== 'user') {
        await transaction.rollback();
        return res.status(403).json({
          message: 'Only user can borrow books'
        });
      }

      if (!userId) {
        await transaction.rollback();
        return res.status(400).json({
          message: 'x-user-id header is required'
        });
      }

      const { bookId, latitude, longitude } = req.body;

      if (!bookId) {
        await transaction.rollback();
        return res.status(400).json({
          message: 'bookId is required'
        });
      }

      if (latitude === undefined || longitude === undefined) {
        await transaction.rollback();
        return res.status(400).json({
          message: 'latitude and longitude are required'
        });
      }

      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        await transaction.rollback();
        return res.status(400).json({
          message: 'latitude and longitude must be numbers'
        });
      }

      const book = await Book.findByPk(bookId, { transaction });

      if (!book) {
        await transaction.rollback();
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      if (book.stock < 1) {
        await transaction.rollback();
        return res.status(400).json({
          message: 'Book out of stock'
        });
      }

      await book.update(
        { stock: book.stock - 1 },
        { transaction }
      );

      const borrowLog = await BorrowLog.create({
        userId: Number(userId),
        bookId,
        borrowDate: new Date(),
        latitude,
        longitude
      }, { transaction });

      await transaction.commit();

      return res.status(201).json({
        message: 'Book borrowed successfully',
        data: borrowLog
      });

    } catch (err) {
      await transaction.rollback();
      next(err); 
    }
  }
};
