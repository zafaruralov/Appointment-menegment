const express = require('express');
const app = express();
const productRoute = require('./routes/product.js');
const userRoute = require('./routes/user.js');
const connectDB = require('./db/connect.js');
const Logger = require('./config/logger.js');
const morganMiddleware = require('./config/morganMiddleware.js');
require('dotenv').config();
const middlewares = require('./middleware/notFound.js');

// middleware

app.use(express.static('./public'));
app.use(express.json());
app.use(morganMiddleware);

// routes

app.use('/user', userRoute);

app.use('/', productRoute)

const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.log(err);
    Logger.error(err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.use('*', middlewares.notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
