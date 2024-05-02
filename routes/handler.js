const express = require('express')
const { forgetPassword, updatePassword } = require('../Controller/auth')


const router = express.Router()

router.route("/reset").post(forgetPassword)
router.route("/update/:token").post(updatePassword)

module.exports = router