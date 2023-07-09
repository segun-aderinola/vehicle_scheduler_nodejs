const {ValidationChain, body, query} = require('express-validator');

const validateLogin = [
    body('username')
        .exists()
        .withMessage('Username is required'),
    
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters")
    
]

const validateSignup = [
    body('name')
        .exists()
        .withMessage('Name is required'),
    body('username')
        .exists()
        .withMessage('Username is required'),
    
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters"),
    
    body('userRole')
        .exists()
        .withMessage('User role is required')
    
];



module.exports = {
    validateLogin, validateSignup
}