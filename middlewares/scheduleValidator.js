const {ValidationChain, body, query} = require('express-validator');
const mongoose = require('mongoose');
const { verifyDate } = require('../functions/verifyTimeDate');


// Custom validation function
// const isMongooseObjectId = (value) => {
//     return mongoose.Types.ObjectId.isValid(value);
// };

const validateVehicle = [
    body('vehicleName')
        .exists()
        .withMessage('Vehicle name is required'),
    body('vehiclePictureUrl')
        .exists()
        .withMessage('Vehicle Picture is required'),        
    body('vehicleType')
        .exists()
        .withMessage('Vehicle Type is required'),
    body('vehicleStatus')
        .exists()
        .withMessage('Vehicle Status is required'),
]

const validateDriver = [
    body('driverName')
        .exists()
        .withMessage('Driver name is required'),
]

const validateSchedule = [
    body('scheduleFor')
        .exists()
        .withMessage('Provide what you are Scheduling for'),
        
    body('driverId')
        .exists()
        .withMessage('Driver ID is required'),
        
    body('vehicleId')
    .exists()
    .withMessage('Vehicle ID is required'),

    body('clientName')
        .exists()
        .withMessage('Client Name is required'),

    body('companyName')
        .exists()
        .withMessage('Company Name is required'),
    
    body('service')
        .exists()
        .withMessage('Service is required'),

    body('startDate')
        .exists()
        .withMessage('Start Date is required')
        // .withMessage('Start Date must be a valid date')
        ,
    body('endDate')
        .exists()
        .withMessage('End Date is required')
        // .isISO8601().withMessage('End Date must be a valid date')
        // .custom((value, {req}) =>{
        //     const startDate = req.body.startDate;
        //     const endDate = value;
        //     verifyDate(startDate, endDate);           
        // })
        ,        

    body('pickUpLocation')
        .exists()
        .withMessage('Pick up Location is required'),

    body('dropOffLocation')
        .exists()
        .withMessage('Drop off Location is required'),

    body('createdBy')
        .exists()
        .withMessage('Provide administrator ID'),
]

module.exports = {
    validateVehicle, validateSchedule, validateDriver
}