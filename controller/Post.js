const dayjs = require("dayjs")
const Post = require("../models/Post")
const Users = require("../models/Users")
const path = require('path')
exports.createPost=async(req,res)=>{
    try{
        const {idUser,judul} = req.body
        const Cari = await Post.findOne({idUser:idUser,judul:judul})
        if(Cari){
            return res.send({
                message:"konten sudah tersedia"
            })
        }else{
            var data = req.body
            var now = dayjs(new Date()).format("dddd, MMMM D, YYYY h:mm A")
            data.history=[{
                status : false,
                createAt : now,
                note : "created"
            }]
            data.tumbname= req.file.filename
            data.harga = "0"
            const create = await Post.create(data)
            return res.send({
                message : "Berhasil menambahkan konten",
                data:create
            })
        }
    }catch(err){
        console.log(err)
        return res.send({
            message : "Server Error"
        })
    }
}
exports.thumbnil=async(req,res)=>{
    const { tumbname } = req.params;
    res.sendFile(path.join (__dirname, `../uploads/${tumbname}`));
}
exports.getAllContent=async(req,res)=>{
    try{
        const {status} = req.query
        const id = req.user.user_id
        const cariUser = await Users.findOne({_id:id})
        if(cariUser.role == "1"){
            if(status){
                const Cari =  await Post.find({status:status})
                return res.send({
                    message : "get Content by id berhasil",
                    data : Cari
            })}
            else{
                const Cari =  await Post.find({})
                return res.send({
                    message : "get Content by id berhasil",
                    data : Cari
            })}
        }else if(cariUser.role !== "1"){
            const Cari =  await Post.find({idUser:id})
            if(Cari){
                return res.send({
                    message : "get Content by id berhasil",
                    data : Cari
                })
            }else{
                return res.send({
                    message : "Lakukan Post Terlebih Dahulu"
                })
            }           
        }
    }catch(err){
        console.log(err)
    }
}

exports.getContentId=async(req,res)=>{
    try{
        const{id}=req.params
        const Cari =  await Post.findOne({_id:id})
        if(Cari){
            return res.send({
                message:"Success",
                value : Cari
            })
        }else{
            return res.send({
                message:"Not found content"
            })
        }
    }catch(err){
        return res.send({
            message: "Server Error"
        })
    }
}

exports.editPost=async(req,res)=>{
    try{
        const {_id,body,judul} = req.body
        const Cari = await Post.updateOne(
            {_id:_id},
            {kontent:body,judul:judul},
            {upsert:true}
            )
        return res.send({
            message: "Update Success",
            data:Cari
        })
    }catch(err){
        return res.send({
            message:"Server Error"
        })
    }
}