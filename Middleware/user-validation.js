const { body } = require('express-validator');

const userRules = () => {
  return [
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 18, max: 100 }),
    body('email').notEmpty().isEmail(),
    body('phone').optional().isMobilePhone('any'),
    body('JobTitle').notEmpty().isString(),
    body('experience').optional().isInt({ min: 0 }),
    body('education').optional().isString(),
    body('password')
      .notEmpty()
      .isLength({ min: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  ];
};

module.exports = { userRules };
