import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


export const getAllCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    let filter = {};
    if(categorySlug){
      const category = await Category.findOne({slug:categorySlug});
      filter = {category:category._id}
    }
    const courses = await Course.find(filter).sort('-createdAdd');
    const categories = await Category.find();
    res.status(200).render('courses', {
      courses,
      categories,
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
    const user = await User.findById(req.session.userID)
    const course = await Course.findOne({ slug: req.params.slug }).populate('user')

    res.status(200).render('course', {
      course,
      page_name: 'courses',
      user
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id: req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id: req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
