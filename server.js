const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const path = require('path');


const app = express();
// app.use(cors());
const allowedOrigins = ['http://localhost:3000', 'https://chelsea-personal-website.onrender.com'];
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use("/", router);
app.use(express.static(path.resolve(__dirname, './build')));
// app.use(express.static(path.join(__dirname, '/build')));
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS
    }
});

contactEmail.verify((error) => {
    if (error) {
            console.log(error);
          } else {
            console.log("Ready to Send");
          }
});

router.post("/api/contact", (req, res) => {
  console.log('Received body:', req.body); 
  const name = req.body.firstName + ' ' + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  console.log('Email', name);
  const mail = {
    from: name,
    to: "chelseaguan19@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  console.log('Email object:', mail);
  contactEmail.sendMail(mail, (error) => {
  if (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log('Email sent successfully!');
  res.json({ code: 200, status: "Message Sent" });
});
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build','index.html'));
});
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/build', 'index.html'));
// });

app.listen(5000, () => {
    console.log(`Server is online on port: ${PORT}`)
});
