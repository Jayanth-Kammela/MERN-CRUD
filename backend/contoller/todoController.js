const TodoSchema = require('../models/todoSchema')

const createProduct = function (req, res, next) {
    try {
        const user_id = req.user._id.toString();
        const product = new TodoSchema({ ...req.body, user_id });
        product.save();
    } catch (error) {
        console.log(error);
    }
}

// const getProducts = function (req, res, next) {
//     TodoSchema.find({}, function (err, data) {
//         return res.status(200).json(data);
//     })
// }

const getUserProduct = async (req, res, next) => {
    const user_id = req.user._id.toString();

    try {
        const users = await TodoSchema.find({ user_id });
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res, next) => {
    const { id } = req.params

    try {
        const users = await TodoSchema.findById({ _id: id });
        // const {id}=req.params
        // const users = await userModel.findOne({_id:id});
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(422).json(error);
    }

}


const updateProduct = async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {
        const { id } = req.params
        const users = await TodoSchema.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        // the document before updates are applied if `new: false`, or after updates if `new = true`
        return res.status(200).json(users)
    } catch (error) {
        return res.status(422).json(error);
    }

}


const deleteProduct = async (req, res, next) => {

    const { id } = req.params;

    try {
        const users = await TodoSchema.findByIdAndDelete({ _id: id })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(422).json(error);
    }

}


module.exports = { getProduct, createProduct, updateProduct, deleteProduct, getUserProduct }