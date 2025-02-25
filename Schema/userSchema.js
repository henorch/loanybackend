import mongoose from 'mongoose';
import { Guarantor } from './GuarantorSchema.js';
import  bcrypt  from 'bcryptjs'
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
        required: false
    },
    name: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    nin: {
        type: String,
        required: false
    },
    regnum: {
        type: String,
        required: false
    },

    guarantors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Guarantor' // Reference to Guarantor model
        }
    ]
});


CustomersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    } catch (error) {
        next(error);
    }
});

CustomersSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password); 
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};


const Customers = mongoose.model('Customers', CustomersSchema);

export { Customers };
