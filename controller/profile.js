const Users = require("../models/Users")
exports.editProfile=async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.user)
        const {name,email,gendre,phone,addres,norek,nameRek,nameBank} = req.body
        await Users.updateOne(
            {_id:req.user.user_id},
            {name:name,email:email,gendre:gendre,phone:phone,
            addres:addres,image:req.file.filename},
            {upsert:true}
            )
            
            const data = {
                "bankName" : nameBank,
                "noRek" : norek,
                "nameRek" : nameRek
            }
        const EditObject = await Users.updateOne(
            {_id:req.user.user_id},
            { $set: { noRek:data}}
            )
        return res.send({
            message: "Update Success",
            data:EditObject
        })
    }catch(err){
        return res.send({
            message : err.message
        })
    }
}