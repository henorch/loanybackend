import { Guarantor } from "../Schema/GuarantorSchema.js";
import { Customers } from "../Schema/userSchema.js";



async function FetchAllUser() {
    // Find all customers from the database
    const customers = await Customers.find().exec(); 

    return Promise.all(customers.map(async (customer) => {
        // Find guarantors for each customer by regnum
        const customerGuarantors = await Guarantor.find({ regnum: customer.regnum }).exec();
        
        return {
            ...customer.toObject(), // Convert Mongoose document to plain JavaScript object
            guarantors: customerGuarantors
        };
    }));
}

async function GetGuarantorByUserId(customerid, contextValue) {
    // Ensure the user is authenticated
    if (!contextValue.user) {
        return null; // Or throw an error if user is not authenticated
    }

    // Find the customer by ID
    const customer = await Customers.findById(customerid).exec();
    if (!customer) {
        throw new Error('Customer not found');
    }

    // Find the guarantors for the customer by their regnum
    const foundGuarantors = await Guarantor.find({ regnum: customer.regnum }).exec();

    return foundGuarantors;
}

export { FetchAllUser, GetGuarantorByUserId}