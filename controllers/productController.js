const Product = require("../models/productsModel");

exports.create = (data) => Product.create(data);
exports.findAll = () => Product.find();
exports.findById = (id) => Product.findById(id);
exports.updateById = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
exports.deleteById = (id) => Product.findByIdAndDelete(id);
