// DELIVERABLE 3 - KENNY CAUSO

const express = require('express');
const {port} = require('./config');
const db = require('./utils/database');
const initModels = require('./models/initModels')
const productRouter = require('./products/products.router');

// -----
db.authenticate()
    .then(() => console.log("DB Authentication Succesfull"))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))
    
initModels()

// -----
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({message: "OK!"});
});

// -----
app.use('/products', productRouter)


// -----
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})