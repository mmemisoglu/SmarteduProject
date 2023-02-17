import express from "express";

const app = express();

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));


//ROUTER
app.get("/", (req, res) => {
  res.status(200).send("INDEX SAYFASI");
});


//Sever listen
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
