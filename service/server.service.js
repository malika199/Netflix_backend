const express = require('express');
const bodyParser = require('body-parser');
const config = require("../configs");
const cors = require('cors');
const port = config.server.port;
const apiRouter = require('../routes');
// const { ApolloServer, gql } = require('apollo-server-express');
// const schemas = require('../apollo/schemas/product.schema');
// const resolvers = require('../apollo/resolvers/product.resolver');
const app = express();
const nodemailer = require('nodemailer');
const exphbs =  require('express-handlebars');
// const graphQlServer = new ApolloServer({
//   typeDefs: schemas,
//   resolvers
// });
// graphQlServer.applyMiddleware({ app, path: '/graphql' })
app.use(cors());

// app.use(function (req, res, next) {
//   if (req.originalUrl === '/api/v1/webhooks/stripe') {
//     next();
//   } else {
//     express.json()(req, res, next);
//   }
// });
app.use(express.json())
app.use('/netflix/', apiRouter);

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};
