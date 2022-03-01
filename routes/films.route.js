const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controllers');

router.post('/addFilm',filmController.insertFilm);

router.get('/getFilms',filmController.getFilms);

router.get('/getFilmsByCategorie/:categorie',filmController.getFilmsByCategorie);


module.exports = router;