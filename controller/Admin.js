const { findOne } = require("../models/Post")
const Post = require("../models/Post")
exports.getAcceptedPost=async(req,res)=>{
    try{
        const{id}= req.query
        console.log(id)
        const CariPost = await  Post.findOne(
            {_id:id}
        )
       if(CariPost.status == false){
           return res.send({
               message:"this post pending status",
               data : false
           })
       }else{
           return res.send({
               message:"this post accepted status",
               data : true
           })
       }
    }catch(err){
        return res.send({
            message:"Server Error"
        })
    }
}

exports.postCommand=async(req,res)=>{
    try{
        const {idContent,data,status,harga} = req.body
        console.log(status)
        if(status == "false"){
            const updated = await Post.updateOne(
                {_id : idContent},
                {$push:{history:data}}
            )
            return res.send({
                message:"update berhasil status pending",
                data : updated
            })
        }
        else if(status == "true"){
            console.log(status)
            const updateStateus = await Post.updateOne({_id:idContent},{status:status,harga:harga})
            const push = await Post.updateOne({_id:idContent},
                {$push:{history:data}}
            )
            return res.send({
                message : "Updated Post berhasil, Status Posted. ",
                data:push
            })
        }
    }catch(err){
        console.log(err)
        return res.send({
            message:"Server Error"
        })
    }

}