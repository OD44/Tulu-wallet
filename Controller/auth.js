const { isStrongPassword } = require("validator");
const userModel = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const generateRandom = () => {
	return Math.random().toString() + 'djyk';
};


const registerAccount = async(req, res)=>{
    try {
		if (req.body.email) {
			req.body.email = req.body.email.toLowerCase();
		}

		const {email, password, first_name, last_name} = req.body;

		const passwordSecurityOptions = {
			minLength: 6,
			minLowercase: 0,
			minUppercase: 0,
			minNumbers: 0,
			minSymbols: 0,
		};

		const requiredKeys = ['first_name', 'last_name', 'email', 'password'];
		let unavailableKeys = [];
		requiredKeys.forEach(key => {
			if (!Object.keys(req.body).includes(key)) {
				unavailableKeys.push(key);
			}
		});
		if (unavailableKeys.length > 0) {
			throw new Error(
				`Please provide all required keys '${[unavailableKeys]}'`
			);
		}

		if (!isStrongPassword(password, passwordSecurityOptions)) {
			throw new Error('Please input a stronger password\n at least 6 digits');
		} else if (password) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			req.body.password = hash;
		}

		let user = await userModel.findOne({email: req.body.email});
		if (user) throw new Error('User with given email already exist!');

		user = await userModel.create({
			email,
			password: req.body.password,
			first_name,
			last_name,
		});

		const id = user._id.toString();
		const token = jwt.sign(id, process.env.JWT_SECRET);
		user.token = token;
		await user.save();

		res.status(200).json({
			success: true,
			data: {
				email,
				first_name,
				last_name,
				token,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({message: error.message, success: false});
	}
}; 


const loginAccount = async (req, res) => {
	try {
		if (req.body.email) {
			req.body.email = req.body.email.toLowerCase();
		}
		const {email, password} = req.body;
		if (!email || !password) {
			throw new Error('Please provide your email and password');
		}
		const result = await userModel.findOne({email});

		if (!result) throw new Error('Invalid Credentials');

		const compare = await bcrypt.compare(password, result.password);

		if (!compare) throw new Error('Invalid Credentials');
		else {
			const {_id, email, first_name, last_name} = result;
			const id = _id.toString();
			const token = jwt.sign(id, process.env.JWT_SECRET);

			res.status(200).json({
				success: true,
				data: {
					id: _id,
					email,
					first_name,
					last_name,
					token,
				},
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(401).json({message: error.message, success: false});
	}
};

module.exports = {
    registerAccount,
    loginAccount
}