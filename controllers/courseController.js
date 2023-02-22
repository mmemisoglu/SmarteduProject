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
    const query = req.query.search;
    let filter = {};
    if(categorySlug){
      const category = await Category.findOne({slug:categorySlug});
      filter = {category:category._id}
    }
    if(query){
      filter = {name:query} 
    }
    if(!query && !categorySlug){
      filter.name = "",
      filter.category = null
    }
    const courses = await Course.find({
      $or:[
        {name: {$regex: '.*' + filter.name + ".*", $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAdd').populate('user');
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
    const categories = await Category.find()
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      user,
      categories
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
