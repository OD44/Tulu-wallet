const sendEmail = require("../middleware/nodemailer");
const User = require("../model/user")
const mongoose = require("mongoose")




const generateRandom = () =>{
    return Math.random().toString() + "hgjk"
};

const forgetPassword = async (req, res) =>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({error: "User not found"})
        }
        const token = generateRandom();
        user.resetToken = token;
        user.resetExpires = Date.now() + 3600000;

        await user.save();

        const resetLink = `Dear ${user?.first_name}, Click the link to reset your password: ${process.env.localhost_url}/update/${token}`;
        console.log("reset link", resetLink);

        await sendEmail(
            process.env.admin_email,
            email,
            resetLink,
            "Password Reset Link From Tulu Wallet"
        )
        return res.status(200).json({message: " Mail sent successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"})
    }
}

const updatePassword = async (req, res) =>{
    try{
        const { password, confirmPassword} = req.body;
        if(!password || !confirmPassword){
            return res.status(400).json({error: "Password and Confirm Password are required"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password do not match"})
        }
        const user = await User.findOne({
            resetToken: req.params.token,
            resetExpires: {$gte: Date.now()},
        });
        if (!user){
            return res.status(400).json({error: "Password reset token is invalid or has expired"})
        }

        user.password = password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		user.password = hash;

        user.resetToken = undefined;
        user.resetExpires = undefined;

        await user.save();

        return res.status(200).json({ msg: 'Password successfully reset' });

    } catch (error){
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}


module.exports = {forgetPassword, updatePassword}