const express= require('express');
const mongoose=require('mongoose');
const app=express();
const Product=require('./models/Productmodels')

app.use(express.json());
//routes applications

app.get('/',(req,res)=>{
    res.send("hello sample")
})
app.get('/product',async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.get('/product/:id',async(req,res)=>{
    try {
        const{id}=req.params
        const products=await Product.findById(id)
        res.status(200).json(products)
        

        
    } catch (error) {
        
        res.status(500).json({message:error.message})    }
})

app.post('/product',async(req,res)=>{
   try{
      const product=await Product.create(req.body)
      res.status(200).json(product)

   }catch(error){
    console.log(error.message)
    res.status(500).json({message:error.message})
   }
})



//UPDATE AND EDIT THE PRODUCT

app.put('/product/:id',async(req,res)=>{
    try {
        const {id} =req.params 
         const product= await Product.findByIdAndUpdate(id,req.body);

         //caanot find any product in database
         if(!product){
            return res.status(500).json({message:`cannot find any product with Id ${id}`})
         }       
         res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


 //mongodb connection

 mongoose.
  connect('mongodb+srv://sanojcsam123:PVzEvw7ZaSqirMtN@sampleapi.pdfnnkx.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(()=>{
    app.listen(3000,()=>{
        console.log("app running started on port 3000");
    })
    console.log("database connected success")
  }).catch((err)=>{
          console.log(err)
  })

