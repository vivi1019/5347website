const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    active: { type: Boolean, default: false },
    name: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image_url: { type: String },
    strength: { type: Number },
    speed: { type: Number },
    skill: { type: Number },
    fear_factor: { type: Number },
    power: { type: Number },
    intelligence: { type: Number },
    wealth: { type: Number },
}, { versionKey: false });

module.exports = mongoose.model('Character', characterSchema);
