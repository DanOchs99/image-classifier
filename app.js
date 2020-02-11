// image-classifier-server
// provide a MongoDB image store for user to upload images to

const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const dburl = 'mongodb://localhost:27017'

const app = express()
app.use(cors())
app.use(express.json({limit: '10mb'}))
app.use(express.static('public'))

//mongoose.connect(dburl, ()=>{

//})


// send index.html
app.get("/",(req,res)=>{
    res.sendFile(path.join(`${__dirname}/public/index.html`))
})

// retrieve a list of all the photo ids
app.get("/photos",(req,res)=>{
    res.end()
})

// retrieve an image and classifications by id
app.get('/photo/:id', (req, res) => {
    let filename = req.params.id

    //db.collection('mycollection').find().toArray((err, result) => {
     
    //      const imgArray= result.map(element => element._id);
    //            console.log(imgArray);
     
    //   if (err) return console.log(err)
    //   res.send(imgArray)
     
    //  })
    res.json({message: `/photos route....   ${filename}`})

})

// upload a photo
app.post('/photo', (req, res) => {
    //console.log(req.body.image)

    // save image to MongoDb
    res.json({message: 'success'})    
})

app.listen(3000,()=>{
    console.log("Server is running...")
})
