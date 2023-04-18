const express= require('express');
const app=express();



//routes applications

app.get('/',(req,res)=>{
    res.send("hello sample")
})



app.listen(3000,()=>{
    console.log("app running started on port 3000");
})