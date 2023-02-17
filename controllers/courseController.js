import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
    req.status(201).json({
      status: "succes",
      course,
    });
  } catch {
    req.status(404).json({
      status: "fail",
      error,
    });
  }
};


