const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const User = require('./schema')
const port = process.env.PORT || 5000;

connectDB();

app.post('/submit',async(req,res)=>{
    const{name,phone}=req.body;

    try{
        const newUser = new User({
            name,
            phone,
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({message:'User Created', user: newUser});
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/submitTest',(req,res)=>{
    console.log("Post api");
    const recivedData = req.body;
    console.log(recivedData);

    res.json({
        message: 'Data received successfully',
        recivedData : recivedData ,
    })
})

app.get('/', (req,res)=>{
    console.log("You are inside the / route")
    res.send("Route")
})

app.get('/about', (req,res)=>{
    res.send('Reached about');
})

app.listen(port,()=>{
    console.log(`Server is running on ${port} `);
});