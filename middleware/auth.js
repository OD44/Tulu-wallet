const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

const isLoggedIn = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await userModel.findById(decoded).select('-password');
			if (!req.user) throw new Error('Not authorized');
		} catch (error) {
			console.log(error.message);
			return res
				.status(401)
				.json({status: false, message: 'Not authorized, no token'});
		}
	}
	if (!token) {
		return res
			.status(401)
			.json({status: false, message: 'Not authorized, no token'});
	}
	next();
};


const isVerified = async (req, res, next) => {
	try {
		const user = req.user;
		if (!user) throw new Error('Not authorized');
		if (!user.isVerified)
			throw new Error('You have to verify your email first to submit a form');
		next();
	} catch (error) {
		console.log(error.message);
		return res.status(401).json({status: false, message: error.message});
	}
};

module.exports = {
	isLoggedIn,
	isVerified
}