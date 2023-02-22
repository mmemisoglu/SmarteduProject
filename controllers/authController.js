import bcrypt from "bcrypt";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js"

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).redirect("/login")
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
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
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

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
}

export const getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id: req.session.userID}).populate('courses')
  const categories = await Category.find();
  const courses = await Course.find({user: req.session.userID})
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
  });
};



