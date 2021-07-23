const { string } = require("@hapi/joi");
const mongose = require("mongoose")
var mongoDB = "mongodb://192.168.20.120:27017/julio";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    gendre:String,
    phone:String,
    addres: String,
    image: String,
    Post : {
        type: mongose.Schema.Types.ObjectId,
        ref:"Post"
    },
    noRek:Object
    
},{collection:"user"})

module.exports = mongose.model("Users",schema)