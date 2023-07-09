const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  password: { type: "string", required: true },
  userRole: { type: "string", required: true, enum: "admin" },
});



userSchema.pre('save', async function(next){
    try {
      if(this.password){
        const saltFig = 10;

        const salt = await bcrypt.genSalt(saltFig);

        const hashPassword = await bcrypt.hash(this.password, salt);
                // Store hash in your password DB               
         if(hashPassword){
          this.password = hashPassword;                                       
          next();
         }
                          
        }
        
    } catch (error) {
       return next(error)
    }
})




module.exports = mongoose.model("User", userSchema);;
