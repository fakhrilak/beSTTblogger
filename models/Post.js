const mongose = require("mongoose")
var mongoDB = "mongodb://localhost:27017/julio";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    judul:String,
    status:String,
    kontent:String,
    history:Array,
    createAt:String,
    idUser : String,
    tumbname:String,
    harga : String
},{collection:"post"})

module.exports = mongose.model("Post",schema)