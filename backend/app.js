//.env file dont get uploaded to any server .env file contains import data like paymentgateway data clients data. 

require('dotenv').config()                  // Importing .dotenv package for env 


// Importing Pacakages / library  
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");



// PORT Connections 
const port = process.env.PORT ||  8000;         // It will either use process.env.PORT or 8000 Port

const app = express();

// DB connections 
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(()=>{
        console.log("DB is connected")
    }).catch();
    
// MiddleWare     
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes 
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);




// Server is Running 
app.listen(port, () => {
    console.log(`Server is running ${port} port`)
})