const Film = require("../models/film.model");
const configs = require("../configs");


exports.getFilms = (req, res) => {
 
    Film.find()
      .then(result => {
          res.send(result.length > 0 ? result : []);
      })
      .catch(err => {
          console.log(err);
          res.status(404).send(error);
      })
      
      
  };

  exports.insertFilm = (req, res) => {
    
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        categorie: req.body.categorie,
        img: req.body.img

    })
    film.save().then((data) => {
        res.status(200).send();
        console.log(' nouveau film', data)
    }).catch((error) => {
        res.status(400).send(error);
    })
    
  }

  exports.getFilmsByCategorie = (req, res) => {
 
        let categorie = req.params.categorie;
        Film.find({ categorie: categorie })
        .then((data) => {
            res.status(200).send({ data});
        }).catch((error) => {
            console.log(error)
            res.status(404).send(error);
        })
    
  }