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
    body('password').notEmpty().isString(),
    // Validate role object
    body('role')
      .notEmpty()
      .withMessage('Role object is required')
      .isObject()
      .withMessage('Role must be an object')
      .custom((value, { req }) => {
        const validRoles = ['admin', 'employee', 'manager'];
        for (const key of Object.keys(value)) {
          if (!validRoles.includes(key) || typeof value[key] !== 'boolean') {
            throw new Error('Invalid role object');
          }
        }
        return true;
      })
      .withMessage('Invalid role object')
  ];
};

module.exports = { userRules };
