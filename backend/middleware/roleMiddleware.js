'use strict';

module.exports = function checkRole(requiredRole) {
  return (req, res, next) => {
    const role = req.headers['x-user-role'];

    if (!role) {
      return res.status(401).json({
        message: 'x-user-role header is required'
      });
    }

    if (role !== requiredRole) {
      return res.status(403).json({
        message: 'Access forbidden'
      });
    }

    next();
  };
};