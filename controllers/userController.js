const User = require("../models/userModels");

exports.findAll = () => User.find();
exports.findById = (id) => User.findById(id);
exports.create = (data) => User.create(data);
exports.updateById = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
exports.deleteById = (id) => User.findByIdAndDelete(id);
