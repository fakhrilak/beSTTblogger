const Users = require("../models/Users")
const jwt = require("jsonwebtoken");
const { find } = require("../models/Users");

exports.auth = (req, res, next) => {
	let header, token;
	if (
		!(header = req.header('Authorization')) ||
		!(token = header.replace('Bearer ', ''))
	)
		return res.status(401).send({ message: 'Unauthorized' });

	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).send({ message: 'Invalid token' });
	}
};

exports.authAdmin = async(req,res,next)=>{
	let header, token;
	if (
		!(header = req.header('Authorization')) ||
		!(token = header.replace('Bearer ', ''))
	)
		return res.status(401).send({ message: 'Unauthorized' });

	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		req.user = verified;
		const user = await Users.findOne({_id:req.user.user_id})
		if(user.role == "1"){
			next()
		}else{
			return res.send({
				message : "Rejected"
			})
		}
	} catch (error) {
		res.status(400).send({ message: 'Invalid token' });
	}
}