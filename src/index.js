require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const userRouter = require('./routes/user')
const { errorMiddleware } = require('./middleware/error.middleware')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use(userRouter)
app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})