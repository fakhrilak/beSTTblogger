const Users = require("../models/Users")
exports.editProfile=async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.user)
        const {name,email,gendre,phone,addres} = req.body
        const Cari = await Users.updateOne(
            {_id:req.user.user_id},
            {name:name,email:email,gendre:gendre,phone:phone,
            addres:addres,image:"http://localhost:5000/ta/thumbnil/"+req.file.filename},
            {upsert:true}
            )
        return res.send({
            message: "Update Success",
            data:Cari
        })
    }catch(err){

    }
}