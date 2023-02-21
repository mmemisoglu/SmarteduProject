import User from "../models/User.js";

export const accessControl = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user){return res.redirect("/login");}
    next();
  });
};

