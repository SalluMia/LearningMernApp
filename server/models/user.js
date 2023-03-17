const mongoose=require('mongoose')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const SECRETE_KEY= 'openitsalmankhan1@gmail'
const UserSchema=new mongoose.Schema({
        
         name:{
             type:String,
             required:true
         },
         email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        work:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        cpassword:{
            type:String,
            required:true
        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
})

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next()
});

UserSchema.methods.generateAuthToken= async function(){
  
    try{
          let token=jwt.sign({_id:this._id},SECRETE_KEY);
          this.tokens=this.tokens.concat({token:token});
          await this.save();
          return token;
    }
    catch(e){
         console.log(e)
    }
}

const user= mongoose.model('USER', UserSchema)
module.exports=user;