require('dotenv').config()
const app = require("./service/server.service");
const mongoService = require("./service/mongoose.service");

mongoService.dbConnect();
app.start();