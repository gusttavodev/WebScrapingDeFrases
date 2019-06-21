const mongoose = require('mongoose');

const FraseSchema = new mongoose.Schema({
    frase: String,
    tag: String,
    site: String,   
    autor: String, 
    createdAt: {
        type: Date,
        default: Date.now,        
    },
});

module.exports = mongoose.model('Frase', FraseSchema)