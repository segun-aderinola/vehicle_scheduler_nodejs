const express = require('express');
const router = express.Router();
const {addDriver, getAllDrivers, getDriver, deleteDriver, updateDriver} = require('../../controllers/driverController');
const { validateDriver } = require('../../middlewares/scheduleValidator');


router.post('/addDriver', validateDriver, addDriver);
router.get('/', getAllDrivers);
router.get('/:id', getDriver);
router.delete('/:id', deleteDriver);
router.put('/:id', validateDriver, updateDriver)
module.exports = router;