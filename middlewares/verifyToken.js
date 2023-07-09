const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const verifyToken = (req, res, next) =>{
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if( req.cookies.authorization){
        const token = req.cookies.authorization;

        jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken)=>{
            console.log(decodedToken);

            if (err) {
        res
          .status(400)
          .send({ success: false, message: "Invalid Token Gotten" });
      } else {
        next();
      }
        });
    }else {
        res
          .status(400)
          .send({ success: false, message: "Unauthorized access detected!!!" });
      }
    
}

module.exports = verifyToken;