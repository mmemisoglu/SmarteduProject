import express from "express";
import pageRoute from "./routes/pageRoute.mjs";



//Express start
const app = express();

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public')); //We specify the location of static files

//ROUTER
//Page Controller
app.use("/", pageRoute );


//Sever listen
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
