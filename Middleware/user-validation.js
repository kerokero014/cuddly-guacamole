const { body } = require('express-validator');

const userRules = () => {
  return [
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 18, max: 100 }),
    body('email').notEmpty().isEmail(),
    body('phone').optional().isMobilePhone('any'),
    body('JobTitle').notEmpty().isString(),
    body('experience').notEmpty().isInt({ min: 0 }),
    body('education').notEmpty().isString(),
    body('password').notEmpty().isString()
  ];
};

module.exports = { userRules };
