const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const {password} =req.body
    const user = await new User(req.body);
    const passwordHash = bcrypt.hash(password,100)
    user.save()
    res.json({ message: "User Added successfully!", data: user });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req,res)=>{
  try{
  const {emailId, password} = req.body;
  console.log(emailId, password)

  const user =await User.findOne({emailId: emailId})
  
  if(!user){
    throw new Error("invalid credientials")
  }
   const validPassowrd = await bcrypt.compare(password, user.password)
  if(validPassowrd){
    res.send("Login Successfully")
  }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = authRouter;