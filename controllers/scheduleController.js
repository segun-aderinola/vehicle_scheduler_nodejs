const { validationResult } = require("express-validator");
const schedule = require("../models/schedule");

const createSchedule = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: "Invalid Data sent",
            error: errors.array()
        })
    }
    const scheduleData = req.body;
    try{
        const startDate = new Date(scheduleData.startDate);
        const endDate = new Date(scheduleData.endDate);
        if(endDate < startDate){
            return res.status(422).json({
                success: false,
                message: "Start Date can not be greater than end date"
            })
        }
        else{
            const saveData = await schedule.create(scheduleData);
            if(saveData){
                return res.status(200).json({
                    success: true,
                    message: "Schedule data saved successfully",
                    result: saveData
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: "Unable to save Schedule data",                    
                })
            }
        }

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to process request",
            error: err
        })
    }

}

const getSchedule = (req, res, next) =>{
    res.send('Hello')

}
const getAllSchedules = (req, res, next) =>{
    res.send('Hello')

}

const updateSchedule = (req, res, next) =>{
    res.send('Hello')

}

const deleteSchedule = (req, res, next) =>{
    res.send('Hello')

}

module.exports = {
    createSchedule, getAllSchedules, getSchedule, updateSchedule, deleteSchedule
}