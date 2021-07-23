const dayjs = require("dayjs");
const { findOne } = require("../models/Post")
const Post = require("../models/Post")
exports.getAcceptedPost=async(req,res)=>{
    try{
        const {page} = req.query;
        const limit = 10
        const CariPost = await  Post.find(
            {status:true},
            {judul:1,tumbname:1,createAt:1,kontent:1}
        ).limit(limit).skip(page*limit)
        return res.send({
            message:"this post accepted status",
            data : CariPost
        })
       
    }catch(err){
        return res.send({
            message:err.message
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
            await Post.updateOne({_id:idContent},{status:status,
            "harga.harga":harga})
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
            message:err.message
        })
    }

}

exports.getTagihan=async(req,res)=>{
    try{
        const cari = await Post.find({status:true,"harga.status":false},
            {harga:1}).populate("User","-password")
        return res.send({
            message : "Success",
            data:cari
        })
    }catch(err){
        return res.send({
            message : err.message
        })
    }
}

exports.editTagihan=async(req,res)=>{
    try{
        const {id} = req.body
        const {filename} = req.file
        const validatingStatus = await Post.findOne({_id:id})
        if(validatingStatus.status == "false"){
            return res.send({
                message : "Periksa konten, konten ini belom terverifikasi",
            })
        }
        const data = {
                "status" : true,
                "harga" : validatingStatus.harga.harga,
                "buktiTf": filename
            }
        console.log(data,"ini data ku")
        const EditObject = await Post.updateOne(
            {_id:id},
            { $set: { harga:data}}
            )
        return res.send({
            message : "updated tagihan berhasil",
            data : EditObject
        })
    }catch(err){
        return res.send({
            message: err.message
        })
    }
}