const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const cookie = require('cookie');
const multer  = require('multer')

require("../db/conn")
const User=require('../models/user')
const Posts=require('../models/posts')
const { set } = require('mongoose')
dotenv.config({path:'../config.env'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.fieldname)
    }
  })
  
  const upload = multer({ storage: storage })

  const SECRETE_KEY= 'openitsalmankhan1@gmail'



const middleWare=(req,res,next)=>{
    console.log('hello to middlewares')
    next()
}

router.get('/about',middleWare,(req,res)=>{
    res.send('Hello from about');
})

router.post('/signup',async(req,res)=>{
  try{
         const {name,email,phone,work,password,cpassword}=req.body;

         if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error: "Please filled properly"});
         }
     
       
            const userExist= await User.findOne({email: email});

            if(userExist){
                return res.status(422).json({error: "Email Already Exist"})
            }
            else if(cpassword != cpassword){
                return res.status(422).json({error: "password are not matching"})
            }else{
                const user= new User({name,email,phone,work,password,cpassword});
                await user.save()

                
                res.status(201).json({message:"User registered Successfully"});
            }
            
          
            
          
         }
         catch(error){
             console.log(error)
         }
        
})

router.post('/signin',async(req,res)=>{
        try{
            
            const {email,password,tokens}=req.body;
            if(!email || !password){
                return res.status(400).json({error:"Please Filled the data"})
            }

            const userLogin= await User.findOne({email:email})

            if(userLogin){
                const isMatch= await bcrypt.compare(password, userLogin.password)
                console.log(isMatch)


                 let token=jwt.sign({_id:this._id},SECRETE_KEY);
            
              
               

                res.cookie('cookieName', token, { maxAge: 3600000 }); // set a cookie with name "cookieName" and value "cookieValue" that expires in 1 hour
                console.log(token)

                // res.send('Cookie set!');

                // const cookies = cookie.serialize('JWTTOKENS', token);
                // res.setHeader('Set-Cookie', cookies);
                // res.json({ message: 'Hello World!' });
              //   res.cookie('hassan', token,{
              //       httpOnly:true
              //  });

               console.log(cookie)
               
                if(!isMatch){
                   
                    res.status(400).json({error:"Invalid Credentials"})
               }
               else{
                res.json({message:"user signin successfully" , result:userLogin })
                
               }
              }

               else{
                    res.status(400).json({error:"Invalid Credentials"})
                      
               }


        }
        catch(e){
              console.log(e)
        }

})

router.post('/Posts',upload.single('image'), async(req,res)=>{
        try{
            const{title,Description}=req.body;
            const image=req.file.path;
           
            const userPostsdata= new Posts({title,Description,image})
   
            await userPostsdata.save();
            res.json({message: "Data inserted successfully"})
        }
        catch(error){
              console.log(error)
        }

})

router.get('/data', async (req,res)=>{
      const data= await Posts.find();

      res.json(data);
})

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
      const singlepost = await Posts.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(singlepost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  


module.exports=router