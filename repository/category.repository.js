const Categories = require("../models/categories")

const categoryRepository = {
    addCategory: async (name) => {
        return await Categories.create({ name })
    },
    getAllCategories: async () => {
        return await Categories.find()
    },
    getCategoryById: async (id) => {
        return await Categories.findById(id)
    },
    updateCategory: async (id, name) => {
        return await Categories.findByIdAndUpdate(id, { name }, { new: true })
    },
    deleteCategory: async (categoryId) => {
        return await Categories.findByIdAndDelete(categoryId);
    }

}
module.exports = categoryRepository;