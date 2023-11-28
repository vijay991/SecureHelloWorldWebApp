require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const cors = require("cors")
const userRouter = require('./routes/user')
const { errorMiddleware } = require('./middleware/error.middleware')

const app = express()
const port = process.env.PORT || 9002
app.use(express.json())

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
app.use(userRouter)
app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`server is running on ${port}.`);
})