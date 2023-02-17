import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
   } 
  catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


