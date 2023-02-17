import express from "express";

const app = express();

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));

//ROUTER
app.get("/", (req, res) => {
    res.status(200).render("index", {
        page_name: "index"
    });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", {
        page_name: "about"
    });
});

//Sever listen
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
