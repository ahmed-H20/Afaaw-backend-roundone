const express = require('express')
const router = express.Router()
const categoryServices = require('../services/categorySevice')



router.route('/').post(categoryServices.creatCategory)
                .get(categoryServices.getAllCategories)


router.route('/:categoryId/product').get(categoryServices.getProductsByCategory)


router.route('/:id').get(categoryServices.singleCategory)
                    .put(categoryServices.updateCategory)
                    .delete(categoryServices.deleteCategory)




module.exports = router