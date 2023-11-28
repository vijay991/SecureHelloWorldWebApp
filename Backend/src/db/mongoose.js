const mongoose = require('mongoose')
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aks1xa2.mongodb.net/`

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connected successfully.');
}).catch(error => {
    throw error
})
