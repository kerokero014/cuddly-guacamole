const body = require('express-validator');

const appRules = () => {
  return [
    body('Job')
      .notEmpty()
      .withMessage('Job field is required')
      .isString()
      .withMessage('Job must be a string'),
    body('Company')
      .notEmpty()
      .withMessage('Company field is required')
      .isString()
      .withMessage('Company must be a string'),
    body('Location')
      .notEmpty()
      .withMessage('Location field is required')
      .isString()
      .withMessage('Location must be a string'),
    body('Salary')
      .notEmpty()
      .withMessage('Salary field is required')
      .isNumeric()
      .withMessage('Salary must be a number'),
    body('Benefits').optional().isArray().withMessage('Benefits must be an array'),
    body('Experience')
      .notEmpty()
      .withMessage('Experience field is required')
      .isString()
      .withMessage('Experience must be a string'),
    body('Skills').optional().isArray().withMessage('Skills must be an array'),
    body('Description').optional().isString().withMessage('Description must be a string'),
    body('website').optional().isURL().withMessage('Invalid website URL'),
    body('interviewDate').optional().isISO8601().toDate().withMessage('Invalid interview date'),
    body('interviewTime').optional().isString().withMessage('Interview time must be a string'),
    body('applicationStatus')
      .optional()
      .isString()
      .withMessage('Application status must be a string'),
    body('interviewStatus').optional().isString().withMessage('Interview status must be a string'),
    body('offerStatus').optional().isString().withMessage('Offer status must be a string'),
    body('interviewFeedback')
      .optional()
      .isString()
      .withMessage('Interview feedback must be a string')
  ];
};

module.exports = { appRules };
