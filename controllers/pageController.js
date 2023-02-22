import nodemailer from "nodemailer"

export const getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

export const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

export const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

export const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

export const getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};


export const sendEmail = async (req, res) => {
  const outputMessage = `
  <h1>Mail Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email:${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "m.memisoglu.dev@gmail.com", // gmail account
      pass: "qrpdybbftfivvteo", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart EDU Contact From" <m.memisoglu.dev@gmail.com>', // sender address
    to: "m.memisoglu.dev@gmail.com", // list of receivers
    subject: "Smart EDU Contact From New Message", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).redirect('contact')



};
