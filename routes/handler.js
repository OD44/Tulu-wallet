const express = require('express')
const { forgetPassword, updatePassword } = require('../Controller/auth')
// const { registerAccount } = require('../Controller/auth')


const router = express.Router()

router.route("/reset").post(forgetPassword)
router.route("/update/:token").post(updatePassword)
// router.route('/').post(registerAccount)

module.exports = router