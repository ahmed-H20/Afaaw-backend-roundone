const express = require('express')
const router = express.Router()
const userServices = require('../services/userService')



router.route('/').get(userServices.getAllUser)
                .post(userServices.creatUser)


router.route('/:id').get(userServices.getSingleUser)
                    .put(userServices.updateUser)
                    .delete(userServices.deleteUser)



module.exports = router
