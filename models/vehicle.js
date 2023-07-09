const mongoose = require('mongoose');


const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: 'string',
        required: true,
    },
    vehiclePictureUrl:{
        type: 'string',
        required: true,
    },
    vehicleType:{
        type: 'string',
        required: true,
    },
    vehicleStatus: {
        type: 'string',
        required: true,
        enum: ['Great Condition', 'Needs Repair']
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema);