var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')

var app = express()

//get db
var db = require('./config/db')

mongoose.connect(db.mongoURI)
.then(() => {
    console.log('local kitchen db live')
})
.catch((err) => {
    console.log(err)
})

//middleware
app.use(express.static('public'))



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//get model
require('./models/kitchen')
var kitchen = mongoose.model('kitchen')

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/admin', (req,res) => {
    kitchen.find({})
    .then(kitchen => {
        res.json(kitchen)
    }).catch(err => {
        res.send(err)
    })
})

app.post('/', (req,res) => {
    var new_kitchen = {
        Name: req.body.Name,
        Quantity: req.body.Quantity,
        CustomerDescription: req.body.CustomerDescription
    }
    new kitchen(new_kitchen)
    .save()
    .then(kitchen => {
        res.json(kitchen)
    }).catch(err => {
        res.send(err)
    })
})

app.put('/:Name', (req,res) => {
    kitchen.findOne({Name: req.params.Name})
    .then(kitchen => {
        kitchen.Quantity= req.body.Quantity
        kitchen.CustomerDescription= req.body.CustomerDescription
        kitchen.save()
        .then(kitchen => {
            res.json(kitchen)
        })
    .catch(err=>{
        res.send(err)
    })
    })
})

app.delete('/:Name', (req,res) => {
    kitchen.deleteOne({Name: req.params.Name})
    .then(kitchen => {
        res.json(kitchen)
    })
    .catch(err => {
        res.send(err)
    })
})

let port = process.env.PORT || 3000
process.env.host
var host = '0.0.0.0'


app.listen(port,host, () => {
    console.log('server running')
})
