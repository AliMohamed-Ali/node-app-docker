const express = require('express');
const mongoose = require('mongoose')
const redis = require('redis');
// const { Client } = require('pg');


const app = express();

const PORT = process.env.PORT || 4000;

//connect to redis 
const REDIS_PORT='6379';
const REDIS_HOST = "redis";
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





const USERNAME = "root"
const PASSWORD = "example"
const DB_PORT ="27017"
const DB_HOST = "mongo"
const URI =`mongodb://${USERNAME}:${PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI)
.then(()=>console.log("db connection ...."))
.catch(err=>console.log(`fail to connection ....` , err));


app.get('/',(req,res)=>{
    redisClient.set("products","products.....")
    res.json("welcom to my app !!js")
})

app.get('/data',async(req,res)=>{
    const products = await redisClient.get("products")
    res.send(`<h1>Hell baby</h1><h2>${products}</h2>`)
})
app.listen(PORT,()=>console.log(`app is up and run on port:${PORT}`))