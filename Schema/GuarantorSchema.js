import mongoose from 'mongoose';

const { Schema } = mongoose;

// Guarantor Schema
const GuarantorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const Guarantor = mongoose.model('Guarantor', GuarantorSchema);

export { Guarantor };
