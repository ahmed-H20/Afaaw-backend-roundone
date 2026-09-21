const express = require("express");
const router = express.Router();

const productItemServices = require("../services/productItemService");


router.route('/').post(productItemServices.createProductItem)
                .get(productItemServices.getAllProductItems)


router.route('/product/:productId').get(productItemServices.getProductItemsByProductId)


router.route('/:id').get(productItemServices.getProductItemById)
                    .put(productItemServices.updateProductItem)
                    .delete(productItemServices.deleteProductItem)


module.exports = router;