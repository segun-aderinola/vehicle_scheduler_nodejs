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

const getSchedule = async(req, res, next) =>{
    const scheduleId = req.params.id;
    if(!scheduleId){
        return res.status(422).json({
            success: false,
            message: 'Schedule ID is required',
            
        })
    }
    try{
        const get_schedule = await schedule.findOne({_id: scheduleId});
        if(get_schedule){
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: get_schedule
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Unable to find schedule',
                result: get_schedule
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch schedule',
            err,
        });
    }

}

const getScheduleByType = async(req, res) =>{
    const scheduleType = req.params.type;
    
    if(!scheduleType){
        return res.status(422).json({
            success: false,
            message: 'Schedule Type is required',
            
        })
    }
    try{
        const get_schedule = await schedule.findOne({scheduleFor: scheduleType});
        if(get_schedule){
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: get_schedule
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Unable to find schedule',
                result: get_schedule
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch schedule',
            err,
        });
    }
}
const getAllSchedules = async(req, res, next) =>{
    try{
        const get_schedule = await schedule.find();
        if(get_schedule){
            if(get_schedule.length === 0){
                return res.status(403).json({
                    success: true,
                    message: 'No Data Available',                
                })
            }
            else{
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: get_schedule
            })
        }
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Unable to find schedule',
                result: get_schedule
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch schedule',
            err,
        });
    }
    

}

const updateSchedule = async(req, res, next) =>{
    const id = req.params.id.toString();
    const scheduleData = req.body;    
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            Message: 'Invalid Data sent',
            error: errors.array(),
        })
    }
    

    try{
      const update =  await schedule.updateOne({_id: id},  scheduleData);
      if(update){
            return res.status(200).json({
                success: true,
                Message: 'Schedule updated successfully',                              
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Unable to update Schedule',
                error: 'Error saving data:'+err,
                
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to send request',
            error: err
        })
    }

}

const deleteSchedule = async (req, res, next) =>{
    const id = req.params.id;

    try{
        const findUser = await schedule.findOne({_id:id});
        if(!findUser){
            return res.status(404).json({
                success: false,
                message: 'Unable to find Schedule',
                
            });
        }
        else{
        const del = await schedule.deleteOne({_id: id});

        if(del){
            return res.status(200).json({
                success: true,
                message: 'Schedule successfully deleted',
                
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to delete schedule',                
            });
        }
    }
    }   
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to send request',
            error: err
        })
    }

}

module.exports = {
    createSchedule, getAllSchedules, getSchedule, updateSchedule, deleteSchedule, getScheduleByType
}