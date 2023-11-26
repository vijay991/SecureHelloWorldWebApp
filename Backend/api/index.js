require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const cors = require("cors")
const userRouter = require('./routes/user')
const { errorMiddleware } = require('./middleware/error.middleware')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

// Set up CORS headers to allow requests from http://localhost:3000
const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(userRouter)
app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`server is running on ${port}.`);
})