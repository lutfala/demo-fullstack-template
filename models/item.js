//Model contains the blue print

const mongoose = require ('mongoose')

const itemSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true

}

})

module.exports = mongoose.model('Item', itemSchema)