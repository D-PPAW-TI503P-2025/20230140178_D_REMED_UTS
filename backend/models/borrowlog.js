'use strict';
module.exports = (sequelize, DataTypes) => {
  const BorrowLog = sequelize.define('BorrowLog', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});

  BorrowLog.associate = models => {
    BorrowLog.belongsTo(models.Book, { foreignKey: 'bookId' });
  };

  return BorrowLog;
};