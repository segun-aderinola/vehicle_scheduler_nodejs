const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validationResult } = require('express-validator');
dotenv.config();


const registerUser = async(req, res) =>{
    const errors = validationResult(req);
    let userData = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: 'Invalid Data sent',
            error: errors.array()
        })
    }
    
        
    try {
        const username = userData.username;
        const checkUsername = await User.findOne({username});

        if(!checkUsername){
           
            const user =  new User(userData);
            const saveUser = await user.save();
            if(saveUser){
                return res.status(200).json({
                    success: true,
                    message: 'Registration successful',
                    data: saveUser
                })
            }
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'User already registered',                
            })
        }        
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error, 
        })
    }
}



const loginUser = async(req, res) =>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            success: false,
            message: 'Invalid Data sent',
            error: errors.array()
        })
    }
    try {
        const {username, password} = req.body;
        
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                success: false,
                message:"User not found"
            }) 
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message:"Invalid Password"
            }) 
        }

        // Generate jwt token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1hr' // expires in 1hr
        })

        if(token){
            return res.status(200).json({
                message: 'Login successful',
                token,
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error
        })
    }
}

const getUsers = async(req, res) => {
    try{
        const get_user = await User.find();
        if(get_user){
            if(get_user.length === 0){
                return res.status(403).json({
                    success: true,
                    message: 'No Data Available',                
                })
            }
            else{
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: get_user
            })
        }
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Unable to find User',
                
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch user',
            err,
        });
    }
}

const get_a_user = async(req, res) => {

    const userId = req.params.id;
    if(!userId){
        return res.status(422).json({
            success: false,
            message: 'User ID is required',
            
        })
    }
    try{
        const get_user = await User.findOne({_id: userId});
        if(get_user){
            return res.status(200).json({
                success: true,
                message: 'Data successfully retrieved',
                result: get_user
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'Unable to find user',
                
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch user',
            err,
        });
    }

}
    module.exports = {
        registerUser, loginUser, getUsers, get_a_user
    }