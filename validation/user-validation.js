const { body } = require('express-validator');

const userRules = () => {
  return [
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 18, max: 100 }),
    body('email').notEmpty().isEmail(),
    body('phone').optional().isMobilePhone('any'),
    body('jobTitle').notEmpty().isString(),
    body('experience').isInt({ min: 0 }),
    body('education').isString(),
    body('password').notEmpty().isString()
  ];
};

module.exports = { userRules };