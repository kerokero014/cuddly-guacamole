const { param } = require('express-validator');

const idValidation = () => {
  return [param('id').notEmpty().isString().isLength({ min: 24, max: 24 })];
};

module.exports = { idValidation };