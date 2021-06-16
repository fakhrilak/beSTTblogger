const Users = require("../models/Users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
exports.Auth = async(req,res)=>{
    try{
        id = req.user.user_id
        const user = await Users.findOne({_id:id})
        console.log(user)
        return res.status(200).send({
             massage:'Auth Success',
             data:user   
		})
    }catch(error){
        res.status(500).send('Server Error')
    }
}
exports.login=async(req,res)=>{
    try{
        const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
			password: Joi.string().min(6).required()
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				message: error.details[0].message
			});
        const {email,password} = req.body
        const Cari = await Users.findOne({email})
        if (Cari){
            const validPass = await bcrypt.compare(password, Cari.password);
            if(!validPass){
                return res.status(400).send({
                    message:"Wrong Email or Password",
                })
            }else{
                const token = jwt.sign({user_id:Cari.id},process.env.SECRET_KEY)
                return res.status(200).send({
                token:token,
                message:"Login Success",
                email:Cari.email
                })
            }
        }else{
            return res.status(400).send({
                message:"Invalid Login"
            })
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Server error"
        })
    }
}

exports.register=async(req,res)=>{
    try{
        const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
            name: Joi.string(),
			password: Joi.string().min(6).required(),
            gendre: Joi.string(),
            addres:Joi.string(),
            phone:Joi.string()
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				message: error.details[0].message
			});
        const {email,password,name} = req.body
        const Cari = await Users.findOne({email})
        if (Cari){
            return res.send({
                message:"Email is already exist"
            })
        }else{
            const hashedPass = await bcrypt.hash(password,10)
            const user = await Users.create({
                ...req.body,
                password:hashedPass,
                role: "2"
            })
            const token = jwt.sign({user_id:user.id},process.env.SECRET_KEY)
            return res.status(200).send({
                token: token,
                email:user.email,
                message:"Register Success"
            })
        }
    }catch(err){

    }
}