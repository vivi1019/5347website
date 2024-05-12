const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    contribution_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    action: {
        type: String,
        enum: ['AddCharacter', 'EditCharacter', 'DeleteCharacter'],
        required: true
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending'
    },
    reviewed_by: {
        _id: {
            type: Schema.Types.ObjectId,
            default: null
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Map,
        of: Schema.Types.Mixed,
        required: true
    }
},{ versionKey: false });

module.exports = mongoose.model('Contribution', contributionSchema);
