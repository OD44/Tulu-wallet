const express = require('express')
const { forgetPassword, updatePassword, getAllUser, getSingleUser, UpdateUser, deleteUser } = require('../Controller/auth')

const router = express.Router()

router.route("/reset").post(forgetPassword)
router.route("/update/:token").post(updatePassword)
router.route("/get-all").get(getAllUser)
router.route("/get-single/:id").get(getSingleUser)
router.route("/update-user/:id").patch(UpdateUser)
router.route("/delete-user/:id").delete(deleteUser)

module.exports = router