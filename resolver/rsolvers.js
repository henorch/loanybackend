import { FetchAllUser, GetGuarantorByUserId } from "../functions/resolverfunction.js";
import { Customers, Guarantor } from "../utils/data.js";




export const resolver = {
    Query: {
        customer: () => FetchAllUser(),

        guarantor: (_, { customerid }, contextValue) => GetGuarantorByUserId(Customers, customerid)
    },

    Mutation: {
        customerLogin: async (_, { input }) => {
            const { username, password } = input;
        }
    }
};
