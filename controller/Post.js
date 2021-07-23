const dayjs = require("dayjs")
const Post = require("../models/Post")
const Users = require("../models/Users")
const path = require('path')
exports.createPost=async(req,res)=>{
    try{
        const {idUser,judul} = req.body
        const CariUser =  await Users.findOne(
            {_id:idUser},
            {_id:1,name:1,email:1}
        )
        console.log(CariUser,"ini cari user")
        const Cari = await Post.findOne(
            {idUser:idUser,judul:judul}
            )
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
            data.harga = {
                status: false,
                harga : 0
            }
            const create = await Post.create({...data,User:idUser})
            return res.send({
                message : "Berhasil menambahkan konten",
                data:create
            })
        }
    }catch(err){
        console.log(err)
        return res.send({
            message : err.message
        })
    }
}
exports.thumbnil=async(req,res)=>{
    const { tumbname } = req.params;
    res.sendFile(path.join (__dirname, `../uploads/${tumbname}`));
}
const sortUniq=(a,key)=>{
    let seen = new Set();
    return a.filter(item => {
        let k = key(item.User._id)
        return seen.has(k) ? false : seen.add(k)
    });
}
const getSum=(shorted,beforeShorted)=>{
    let newData = []
    for(let i = 0; i<shorted.length;i++){
        let jumlah = 0
        for(let k = 0;k<beforeShorted.length;k++){
            if(shorted[i].User._id == beforeShorted[k].User._id){
                jumlah += 1
            }
        }
        newData.push({user:shorted[i].User,qty:jumlah})
    }
    return newData
}
exports.getAllContent=async(req,res)=>{
    try{
        const {status} = req.query
        const id = req.user.user_id
        const cariUser = await Users.findOne({_id:id})
        var now = dayjs(new Date()).format("MM")
        if(cariUser.role == "1"){
            if(status){
                const Cari =  await Post.find({status:status,bulan:now}).populate("User")
                const User = await Post.find({status:status,bulan:now},{User:1}).populate("User")
                const shorted = sortUniq(User, JSON.stringify)
                const user = getSum(shorted,User)
                return res.send({
                    message : "get Content by id berhasil",
                    content : Cari,
                    users:user
            })}
            else{
                const Cari =  await Post.find({}).populate("User")
                const User = await Post.find({},{User:1}).populate("User")
                const shorted = sortUniq(User, JSON.stringify)
                const user = getSum(shorted,User)
                return res.send({
                    message : "get Content by id berhasil",
                    content : Cari,
                    users:user
            })}
        }else if(cariUser.role !== "1"){
            const Cari =  await Post.find({User:{_id:id}})
            if(Cari){
                return res.send({
                    message : "get Content by id berhasil",
                    content : Cari
                })
            }else{
                return res.send({
                    message : "Lakukan Post Terlebih Dahulu"
                })
            }           
        }
    }catch(err){
        console.log(err)
        return res.send({
            message : err.message
        })
    }
}

exports.getContentId=async(req,res)=>{
    try{
        const{id}=req.params
        const{id_req} =req.query
        const Cari =  await Post.findOne({_id:id})
        console.log(id_req)
        if(Cari){
            if(Cari.status == "true"){
                return res.send({
                    message:"Success",
                    value : Cari
                })
            }else{
                if(id_req){
                    const users = await Users.findOne({_id:id_req})
                    if(users.role == "1"){
                        console.log("memek")
                        return res.send({
                            message:"Success",
                            value : Cari
                        })
                    }else if(users.role == "2" && Cari.User+"" == users._id ){
                        console.log("mimik")
                        return res.send({
                            message:"Success",
                            value : Cari
                        })
                    }else if(users._id != Cari.User+""){
                        return res.send({
                            message: "ERROR 404 NOT FOUND",
                            value: false
                        })
                    }
                }else{
                    return res.send({
                        message: "ERROR 404 NOT FOUND",
                        value: false
                    })
                }               
            }
            
        }else{
            return res.send({
                message:"Not found content"
            })
        }
    }catch(err){
        return res.send({
            message: err.message
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
            message:err.message
        })
    }
}