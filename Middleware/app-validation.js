const { body } = require('express-validator');

const appRules = () => {
  return [
    body('Job').isString().withMessage('Job must be a string'),
    body('Company').isString().withMessage('Company must be a string'),
    body('Location').isString().withMessage('Location must be a string'),
    body('Salary').isNumeric().withMessage('Salary must be a number'),
    body('Benefits').isString().withMessage('Benefits must be an array'),
    body('Experience').isString().withMessage('Experience must be a string'),
    body('Skills').isString(),
    body('Description').isString().withMessage('Description must be a string'),
    body('website').isURL().withMessage('Invalid website URL'),
    body('interviewDate').isISO8601().toDate().withMessage('Invalid interview date'),
    body('interviewTime').isString().withMessage('Interview time must be a string'),
    body('applicationStatus').isString().withMessage('Application status must be a string'),
    body('interviewStatus').isString().withMessage('Interview status must be a string'),
    body('offerStatus').isString().withMessage('Offer status must be a string'),
    body('interviewFeedback').isString().withMessage('Interview feedback must be a string')
  ];
};

module.exports = { appRules };
