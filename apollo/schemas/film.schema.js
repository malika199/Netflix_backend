const { gql } = require('apollo-server-express');

module.exports = gql`
    type Film {
        id: ID
        title: String
        description: String,
        categorie: String,
        img: String
    }
    type Query {
        getFilms:[Film]
        getFilm(id:ID):Film!
    }
    type Mutation {
        createFilm(title:String!, description: String, categorie: String, img:String):Film
        updateFilm(id:ID!,title:String!,description: String, categorie: String, img:String):Film
    }
`
