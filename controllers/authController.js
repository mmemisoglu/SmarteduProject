import User from "../models/User.js";

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


export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).render('course', {
      course,
      page_name: 'courses',
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


