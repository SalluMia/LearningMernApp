const mongoose=require('mongoose')

const UserPosts=new mongoose.Schema({
        
         title:{
             type:String,
             required:true
         },
         Description:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        }
})



const userpost= mongoose.model('POSTS', UserPosts)
module.exports=userpost;