const { string } = require("@hapi/joi");
const mongose = require("mongoose")
var mongoDB = "mongodb://localhost:27017/julio";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    gendre:String,
    phone:String,
    addres: String,
    image: String
},{collection:"user"})

module.exports = mongose.model("Users",schema)