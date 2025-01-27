const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')
const path = require('path')

const app = express()



dotEnv.config();
app.use(bodyParser.json());
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))


const PORT = process.env.PORT || 4000;

app.use('/uploads', express.static('uploads'));
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);



app.use('/', (req, res) => {
    res.send("<h1> Welcome to Swiggy");
    console.log('welcome to Swiggy')
})
app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});