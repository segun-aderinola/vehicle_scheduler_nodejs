const mongoose = require('mongoose');


const driverSchema = new mongoose.Schema({
    driverName:{
        type: 'string',
        required: true,
    }
})

module.exports = mongoose.model('Driver', driverSchema);