import mongoose from 'mongoose';
import { Guarantor } from './GuarantorSchema.js';
const { Schema } = mongoose;

// Customers Schema
const CustomersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
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
    },
    nin: {
        type: String,
        required: true
    },
    regnum: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    guarantors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Guarantor' // Reference to Guarantor model
        }
    ]
});


CustomersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10); // Hash password with 10 salt rounds
        this.password = hashedPassword; // Save hashed password
        next();
    } catch (error) {
        next(error);
    }
});

CustomersSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password); // Compare entered password with hashed password
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};


const Customers = mongoose.model('Customers', CustomersSchema);

export { Customers };
