const Logger = require('../config/logger');
const Product = require('../models/Product');
// const AppError = require('../utils/AppError.js');

// const mapToProductWithUser = (product) => {
//     return {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         creator: {
//             id: product.user_id,
//             username: product.username,
//             email: product.email,
//             type: product.type,
//         },
//     };
// };

const productsController = {
    getProducts: async (req, res, next) => {
        try {
            const result = await Product.find({})
            console.log(result)
            const products = result.rows;
            Logger.info(`Products length ${products}`);
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            // const { userId } = req.user;
            const { title, price } = req.body;

            const result = await Product.create(req.body)

            // const product = result.rows[0];
            res.status(201).json({ data: result });
        } catch (error) {
            next(error);
        }
    },
    getOneProduct: async (req, res, next) => {
        try {
            const { id: taskID } = req.params
            const task = await Product.findOne({ _id: taskID })
            if (!task) {
              return next(createCustomError(`No task with id : ${taskID}`, 404))
            }
          
            res.status(200).json({ task })
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id: taskID } = req.params

            const task = await Product.findOneAndUpdate({ _id: taskID }, req.body, {
             new: true,
            runValidators: true,
        })

            if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

            res.status(200).json({ task })
        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id: taskID } = req.params
            const task = await Product.findOneAndDelete({ _id: taskID })
            if (!task) {
              return next(createCustomError(`No task with id : ${taskID}`, 404))
            }
            res.status(200).json({ task })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = productsController;
