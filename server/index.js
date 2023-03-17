const express=require("express")
const bodyParser=require('body-parser')
const app=express()
const cookieParser = require('cookie-parser');
const cors=require("cors")

const corsOptions={
      credentials:true,
}
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());

app.set('trust-proxy', 1);
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.static("/uploads"));
app.use("/uploads", express.static(__dirname + "/uploads"));


require("./db/conn")
require('./models/user')




app.use(require('./routes/routes'))



app.listen(5000,()=>{
       console.log(`Server is running on port ${5000}`)
})