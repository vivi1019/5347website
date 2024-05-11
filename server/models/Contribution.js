const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
    contribution_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, enum: ['AddCharacter', 'EditCharacter', 'DeleteCharacter'], required: true },
    status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    date: { type: Date, default: Date.now },
    data: { type: Object, required: true }
});

const Contribution = mongoose.model('Contribution', contributionSchema);

module.exports = Contribution;
