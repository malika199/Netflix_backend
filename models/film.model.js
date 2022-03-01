const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: String,
  description: String,
  categorie: String,
  img: String,
  video:String,
  iswich:{ 
    type:Boolean,
     default:false
      
  },
 
  date_ajout:{
    type: Date,
    required : true,
    default:Date.now()
},
});

module.exports = mongoose.model('Film', filmSchema);