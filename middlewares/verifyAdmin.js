const getToken = require("../functions/token");
const User = require("../models/user");

const verifyAdmin = (req, next) =>{
    const ID = getToken(req);
    const user = User.findOne(ID);

    if(user?.userRole == "admin"){
        next();
    }
    else{
        res.status(400).send({
            success: false,
            message: "User not permitted.. Unauthorized access",
        })
    }

}

module.exports = verifyAdmin;