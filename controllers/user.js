const { v4: uuidv4 } = require('uuid');
const User = require('../models/User')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// const signJwtToken = (userId, email, username, userType) => {
//     const token = jwt.sign(
//         { userId, email, username, userType },
//         'secretword',
//         {
//             expiresIn: '24h',
//         }
//     );
//     return token;
// };

const userController = {
    register: async (req, res, next) => {
        try {
            console.log(req.body);
            const { email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const task = await User.create(req.body)

            res.status(200).json({ task });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const result = await User.findOne({$or: [{email:username}, {phone:username}]})
            // if(user){
            //     bcrypt.compare(password, user.password, (err, res) => {
            //         if(err)
            //     })
            // }

            const user = result.rows[0];

            if (!user) {
                return next(new AppError(400, 'Invalid user with id'));
            }
            const passwordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordCorrect) {
                return next(new AppError(400, 'Invalid password'));
            }
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    },
};
module.exports = userController;