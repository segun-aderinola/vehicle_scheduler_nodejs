const express = require('express');

const userRoute = require('./userRoute')
const driverRoute = require('./driverRoute')
const vehicleRoute = require('./vehicleRoute')
const scheduleRoute = require('./scheduleRoute')

const router = express.Router();
router.use('/users', userRoute);
router.use('/drivers', driverRoute);
router.use('/vehicles', vehicleRoute);
router.use('/schedule', scheduleRoute);



module.exports = router;