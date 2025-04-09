const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;