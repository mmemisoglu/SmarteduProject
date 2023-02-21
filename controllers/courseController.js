import Course from "../models/Course.js";
import Category from "../models/Category.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
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
