const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {isEmail} = require('validator');

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: [true, 'Please input Your first name'],
			minlength: [3, 'Your first name should be at least 3 characters long'],
		},
		last_name: {
			type: String,
			required: [true, 'Please input Your last name'],
			minlength: [3, 'Your last name should be at least 3 characters long'],
		},
		email: {
			type: String,
			required: true,
			validate: [isEmail, 'Invalid email address'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please input a password'],
			minlength: [6, 'Your password must be at least 6 characters'],
		},
		token: String,
		resetToken: String,
		resetExpires: Date,
	},
	{timestamps: true}
);

const userModel = model('User', userSchema);

module.exports = userModel;