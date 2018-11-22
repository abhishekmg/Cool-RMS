var mongoose = require('mongoose')
var Schema = mongoose.Schema

var kitchenSchema = new Schema({
    Name: {type:String, required:true},
    Quantity: {type:Number, required:true},
    CustomerDescription: String
})

mongoose.model('kitchen', kitchenSchema)

