const mongoose = require('mongoose');


const scheduleSchema = new mongoose.Schema({
    scheduleFor: {
        type: 'string',
        required: true,
        enum: ['vehicle', 'driver'],
        
    },
    driverId: {
        type: mongoose.Types.ObjectId,        
        required: true,
    },
    vehicleId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    clientName: {
        type: 'string',
        required: true,
    },
    companyName: {
        type: 'string',
        required: true,
    },
    service:{
        type: 'string',
        required: true,
    },
    startDate: {
        type: 'string',
        required: true,
    },
    endDate: {
        type: 'string',
        required: true,
    },
    pickUpLocation:{
        type: 'string',
        required: true,
    },
    dropOffLocation: {
        type: 'string',
        required: true,
        
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
    }    
})

module.exports = mongoose.model('Schedule', scheduleSchema);