import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    
    const {email, password} = req.body;
    
    await User.findOne({email: email}, (err,user) => {
      
      if(user){ 
        bcrypt.compare(password, user.password , (err,same) => {
          if(same) {
            // USER SESSION
            res.status(200).send("Logged");
          }
        }) 
      }
    }).clone(err => console.log(err))

  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};



