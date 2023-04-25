const TodoSchema = require('../models/todoSchema')

const createProduct = function (req, res, next) {
    const user_id = req.user._id.toString();
    const product = new TodoSchema({ ...req.body, user_id });
    product.save(function (err, data) {
        if (err) {
            return res.status(422).send(err);
        }
        return res.status(200).json(data)
    });

}

// const getProducts = function (req, res, next) {
//     TodoSchema.find({}, function (err, data) {
//         return res.status(200).json(data);
//     })
// }

const getUserProduct = async (req, res, next) => {
    const user_id = req.user._id.toString();

    // TodoSchema.find({ user_id }, async (err, data)=>{
    //     return res.status(200).json(data);
    // })

    try {
        const users = await TodoSchema.find({ user_id });
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res, next) => {

    const { id } = req.params
    const user_id = req.user._id.toString();

    // TodoSchema.findOne({ _id: id, user_id }, async (err, data)=>{

    //     if (err) {
    //         return res.status(404).send(err);
    //     }
    //     return res.status(200).json(data);
    // })

    try {
        const users = await TodoSchema.findById({ _id: id, user_id });
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

    const user_id = req.user._id.toString();
    try {
        const { id } = req.params
        const users = await TodoSchema.findByIdAndUpdate({ _id: id, user_id }, { $set: req.body }, { new: true })
        // the document before updates are applied if `new: false`, or after updates if `new = true`
        return res.status(200).json(users)
    } catch (error) {
        return res.status(422).json(error);
    }

}


const deleteProduct = async (req, res, next) => {

    const { id } = req.params;
    const user_id = req.user._id.toString();

    // TodoSchema.findByIdAndDelete({_id:id,user_id}, function (err, data) {

    //     if (err) {
    //         return res.status(404).send(err);
    //     }
    //     return res.status(200).json(data);
    // })

    try {
        const users = await TodoSchema.findByIdAndDelete({ _id: id, user_id })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(422).json(error);
    }

}


module.exports = { getProduct, createProduct, updateProduct, deleteProduct, getUserProduct }