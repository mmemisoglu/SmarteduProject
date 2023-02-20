import express from "express";
import mongoose from "mongoose";

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

//MIDDLEWARES
app.use(express.static('public')); //We specify the location of static files
app.use(express.json()) //for parsing application/json
app.use(express.urlencoded({ extended: true})) // for parsing application/x-www-form-urlencoded


//ROUTER
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


//Sever listen
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
