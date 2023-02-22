import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import pageRoute from "./routes/pageRoute.js";
import courseRoute from "./routes/courseRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";

//Express start
const app = express();

//CONNECT DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/smartedu-db', {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // //useFindAndModify: false,
  // //useCreateIndex: true
}).then(() => {
  console.log('DB Connected Successfuly')
}).catch((err) => {
  console.log(err)
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;


//MIDDLEWARES
app.use(express.static('public')); //We specify the location of static files
app.use(express.json()) //for parsing application/json
app.use(express.urlencoded({ extended: true})) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}))
app.use(flash());
app.use((req,res,next) => {
  res.locals.flashMessages = req.flash();
  next();
})


//ROUTER
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


//Sever listen
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
