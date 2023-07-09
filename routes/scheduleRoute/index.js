const express = require('express');
const router = express.Router();

const { getAllSchedules, getSchedule, deleteSchedule, updateSchedule, createSchedule, getScheduleByType } = require('../../controllers/scheduleController');
const { validateSchedule } = require('../../middlewares/scheduleValidator');


router.post('/createSchedule', validateSchedule, createSchedule);
router.get('/', getAllSchedules);
router.get('/:id', getSchedule);
router.delete('/:id', deleteSchedule);
router.put('/:id', validateSchedule, updateSchedule);
router.get('/scheduleFor/:type', getScheduleByType);

module.exports = router;