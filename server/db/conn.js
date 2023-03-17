const express=require('express')
const mongoose=require('mongoose')

const DB="mongodb://localhost:27017/HoshDb"
//Database connection
mongoose.set('strictQuery', false)
mongoose.connect(DB)
    .then(()=>{ console.log("Connection Successful")})
    .catch((e)=>{ console.log("Unsuccessful Connection", e)})