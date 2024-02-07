//*hide stuff from the 'world' database conncetions, usernames, passwords
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const Item = require('./models/Item')
const app = express()

//*backup port in case the other one is not available
const port = process.env.PORT || 3000

//connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.yasmbpk.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//Middleware, app.use is always middleware (express notation)

//enable CORS
app.use(cors())

//serve static files - telling the server where the static files are going to be
app.use(express.static('public'))


//Parse request - help server read the requests
app.use(express.urlencoded({extended: false})) //allows to read arrays
app.use(express.json())

//Set EJS as templating engine
app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('index')
})


app.get('/item', async(req, res) => {
    const items = await Item.find({})
    res.render('item', {items})
})

//CREATE
app.post('/item', async(req, res) => {
    const newItem = new Item(req.body)
    try {
        await newItem.save()
        res.redirect('/item')
    } catch(err){
        res.redirect('/item?error=true')
    }
})

//UPDATE

app.post('/item/update/:id', async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
       await Item.findByIdAndUpdate(id, {name, description})
       res.redirect('/item')
    } catch(err){
        res.redirect('/item?error=true')
    }
})


//DELETE

app.delete('/item/delete/:id', async(req, res) => {
    const {id} = req.params
    try {
       await Item.findByIdAndDelete(id)
       res.status(200).json({message: 'Item deleted successfully'});
    } catch(err){
        res.redirect('/item?error=true')
    }
})

//Start the server


//LOGIC GOES HERE
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})