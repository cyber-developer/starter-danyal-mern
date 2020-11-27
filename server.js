const express = require('express');
const cors = require('cors');
const connectDB=require('./config/db');


const app=express();

//connect database
connectDB();

//init middleware
app.use(cors());
app.use(express.json({extended:false}))

app.get('/',(req,res)=> res.send('running api'));

//define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server started on PORT ${PORT}`));