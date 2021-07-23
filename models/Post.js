const mongose = require("mongoose")
var mongoDB = "mongodb://192.168.20.120:27017/julio";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    judul:String,
    status:String,
    kontent:String,
    history:Array,
    createAt:String,
    bulan: String,
    User : {
        type: mongose.Schema.Types.ObjectId,
        ref:"Users"
    },
    tumbname:String,
    harga : Object
},{collection:"post"})

module.exports = mongose.model("Post",schema)