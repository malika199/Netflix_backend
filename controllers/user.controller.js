const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const configs = require("../configs");
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
   secure: false, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    //  c'est compte de test 
      user: 'estya-ticketing@estya.com',
      pass: 'ESTYA@@2021',
  },
  tls:
      {
         rejectUnauthorized:false
      }
});


exports.getUsers = (req, res) => {
 
  User.find()
    .then(result => {
        res.send(result.length > 0 ? result : []);
      })
    .catch(err => {
        console.log(err);
        res.status(404).send(error);
    })
    
    
};


exports.register = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    nom: req.body.nom,
    email: req.body.email,
    password: hashedPassword,
  }
  
  );

  user
    .save()
    .then((data) => {
      console.log(' data ', data);
      let gender = 'Monsieur  ';
      console.log('gender', gender);
      let htmlmail = '<p> Bonjour ' +  data.nom + ' ' + ', </p><p style="color:black"> <span style="color:orange">Felicitations ! </span> Votre compte Netflix a été crée avec succés.</p><p style="color:black">Cordialement.</p><footer> <img  src="red"/></footer>';
      console.log(' htmlmail ', htmlmail);
      let mailOptions = {
          from: 'estya-ticketing@estya.com',
          to: data.email,
          subject: 'Netflix',
          html: htmlmail,
          attachments: [{
              filename: 'netflix-signature.png',
              path: 'assets/netflix-signature.PNG',
              cid: 'red' //same cid value as in the html img src
          }]
      };
      console.log(' data.email ',data.email);
      console.log(' mailOptions ', mailOptions);
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
            console.log('Email sent: ' + info.response);

              console.log("Email envoyé\nà " + data.email + "\nRaison:Création de compte")
          }
      });
      let userToken = jwt.sign(
        {
          id: data._id,
          // isAdmin: data.isAdmin,
        },
        'secret&ç!',
        {
          expiresIn: 86400,
        }
      );
     
      res.status(200).send({
        auth: true,
        data:user,
        token: userToken
      });
     
    
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(404).send(err));
};

exports.getUser = (req, res) => {
 
    let id = req.params.id;
    User.findOne({ _id: id }).then((user) => {
        let userToken = jwt.sign({ user }, "userData")
        res.status(200).send({ user, userToken });
    }).catch((error) => {
        console.log(error)
        res.status(404).send(error);
    })
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.verifyToken = (req, res) => {
    if (req.user) {
        res.status(200).json({verify:true})
    }
}


exports.deleteuser= (req, res) => {
  
  User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
          res.send(err)
          console.log('y a une erreur ')
      }
      res.send(user)
      console.log(user);
  })
};