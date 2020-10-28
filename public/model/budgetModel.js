const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collection: 'budget'
})

module.exports = mongoose.model('budget', budgetSchema);