const { Schema, model, Types } = require('mongoose');
const User = require('../models/User');

const schema = new Schema({
    longLink: { type: String, required: true },
    shortLink: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    cliks: { type: Number, default: 0 },
    owner: { type: String, default: '' },
})

module.exports = model('Link', schema)
