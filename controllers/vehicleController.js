const { validationResult } = require('express-validator');
const Vehicle = require('../models/vehicle');

const addVehicle = async (req, res, next) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: "Invalid Data sent",
            error: errors.array()
        })
    }

    const vehicleData = req.body;
    
    try{
        
        await Vehicle.create(vehicleData).then((result)=>{           
               return res.status(200).json({
                    success: true,
                    message: "Vehicle added successfully",
                    data: result
                })                    
        }).catch((error)=>{
            res.status(400).json({
                success: false,
                error: error
            })
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            Message: 'Unable to Save Driver',
            error: error,
        })
    }
}

const getVehicle = async(req, res, next) =>{
    const vehicleId = req.params.id;
    if(!vehicleId){
        return res.status(422).json({
            success: false,
            message: 'vehicle ID is required',
            
        })
    }
    try{
        const vehicle = await Vehicle.findOne({_id: vehicleId});
        if(vehicle){
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: vehicle
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to find vehicle Data',
                result: vehicle
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch vehicle Data',
            err,
        });
    }
}
const getAllVehicles = async(req, res, next) =>{
    try{
        const vehicle = await Vehicle.find();
        if(vehicle){
            if(vehicle.length === 0){
                return res.status(200).json({
                    success: true,
                    message: 'No Data Available',                
                })
            }
            else{
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: vehicle
            })
        }
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to find vehicle',
                result: vehicle
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch vehicle',
            err,
        });
    }

}

const updateVehicle = async(req, res, next) =>{
    
    const id = req.params.id.toString();
    const vehicleData = req.body;    
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            Message: 'Invalid Data sent',
            error: errors.array(),
        })
    }
    

    try{
      const update =  await Vehicle.updateOne({_id: id},  vehicleData);
      if(update){
            return res.status(200).json({
                success: true,
                Message: 'vehicle data updated successfully',                              
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Unable to update vehicle data',
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

const deleteVehicle = async(req, res, next) =>{
    const id = req.params.id;

    try{
        const findId = await Vehicle.findOne({_id:id});
        if(!findId){
            return res.status(401).json({
                success: false,
                message: 'Unable to find vehicle',
                
            });
        }
        else{
        const del = await Vehicle.deleteOne({_id: id});

        if(del){
            return res.status(200).json({
                success: true,
                message: 'Data successfully deleted',
                
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Unable to delete vehicle',                
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
    addVehicle, getAllVehicles, getVehicle, updateVehicle, deleteVehicle
}