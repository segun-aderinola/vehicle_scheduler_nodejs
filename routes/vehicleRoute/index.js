const express = require('express');
const router = express.Router();
const {addVehicle, getAllVehicles, getVehicle, deleteVehicle, updateVehicle} = require('../../controllers/vehicleController');
const {validateVehicle} = require('../../middlewares/scheduleValidator');

router.post('/addVehicle', validateVehicle, addVehicle);
router.get('/', getAllVehicles);
router.get('/:id', getVehicle);
router.put('/:id',validateVehicle, updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;