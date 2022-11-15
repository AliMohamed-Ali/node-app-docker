const express = require('express');
const mongoose = require('mongoose')
const redis = require('redis');
// const { Client } = require('pg');
const os = require('os');


const app = express();

const PORT = process.env.PORT || 4000;

//connect to redis 
const REDIS_PORT=process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('conect', () => console.log('Redis Client is connect ....'));
redisClient.connect();


//conect to db

// const USERNAME = "root" 
// const PASSWORD = "example"
// const DB_PORT ="5432"
// const DB_HOST = "postgres "
// const URI =`postgresql://${USERNAME}:${PASSWORD}@${DB_HOST}:${DB_PORT}`
// const client = new Client({
//     connectionString: URI,
// })
// client
// .connect()
// .then(()=>console.log("db connection postgres ...."))
// .catch(err=>console.log(`fail to connection ....` , err));





const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_HOST =  process.env.DB_HOST
const URI =`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI)
.then(()=>console.log("db connection ...."))
.catch(err=>console.log(`fail to connection ....` , err));


app.get('/',(req,res)=>{
    redisClient.set("products","products.....")
    console.log(`os.hostname:${os.hostname}`)
    res.send(`<h1>Hello in AWS</h1><h2>this image using docker hub</h2>`)
})

app.get('/data',async(req,res)=>{
    const products = await redisClient.get("products")
    res.send(`<h1>Hell baby</h1><h2>${products}</h2>`)
})
app.listen(PORT,()=>console.log(`app is up and run on port:${PORT}`))


