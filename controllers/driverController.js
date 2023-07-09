const Driver = require('../models/driver');
const {validationResult} = require('express-validator');

const addDriver = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            Message: 'Invalid Data sent',
            error: errors.array(),
        })
    }
    const driverName = req.body;
    
    try{
        
        await Driver.create(driverName).then((result)=>{
            
               return res.status(200).json({
                    success: true,
                    message: "Driver created successfully",
                    data: result
                })            
            
        }).catch((error)=>{
            res.status(400).json({
                success: false,
                error,
            })
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            Message: 'Unable to Save Driver',
            error,
        })
    }
}

const getAllDrivers = async (req, res) =>{
    try{
        const driver = await Driver.find();
        if(driver){
            if(driver.length === 0){
                return res.status(200).json({
                    success: true,
                    message: 'No Data Available',                
                })
            }
            else{
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: driver
            })
        }
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to find driver',
                result: driver
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch driver',
            err,
        });
    }
    
}

const getDriver = async(req, res) =>{
    const driverId = req.params.id;
    if(!driverId){
        return res.status(422).json({
            success: false,
            message: 'Driver ID is required',
            
        })
    }
    try{
        const driver = await Driver.findOne({_id: driverId});
        if(driver){
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: driver
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to find driver',
                result: driver
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch driver',
            err,
        });
    }
    
}

const deleteDriver = async(req, res)=>{
    const id = req.params.id;

    try{
        const findUser = await Driver.findOne({_id:id});
        if(!findUser){
            return res.status(401).json({
                success: false,
                message: 'Unable to find driver',
                
            });
        }
        else{
        const del = await Driver.deleteOne({_id: id});

        if(del){
            return res.status(200).json({
                success: true,
                message: 'Data successfully deleted',
                
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to delete driver',                
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
const updateDriver = async(req, res) =>{
    const id = req.params.id.toString();
    const driverName = req.body;    
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            Message: 'Invalid Data sent',
            error: errors.array(),
        })
    }
    

    try{
      const update =  await Driver.updateOne({_id: id},  driverName);
      if(update){
            return res.status(200).json({
                success: true,
                Message: 'Driver name updated successfully',                              
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Unable to update Driver name',
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

module.exports = {addDriver, getAllDrivers, getDriver, deleteDriver, updateDriver};