const Film = require('../../models/film.model');

module.exports = {
    Query: {
        getFilms: () => {
            return Film.find();
        },
        getFilm(parent, args, context) {
            return Film.findById(args.id);
        }
    },
    Mutation: {
        createFilm(parent, args) {
            const newFilm = new Product(
                {
                    title: args.title,
                    description: args.description,
                    categorie: args.categorie,
                    img: args.img
                }
            )
            return newFilm.save();
        },
        updateFilm(parent, {id, title, description, img }) {
            return Film.findByIdAndUpdate(id, { title: title , description: description , categorie: args.categorie, img: img });
        }
    }

}