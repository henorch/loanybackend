import { CreateGuarantor, CustomerReg, CusomerLogins, EditCustomerProfile } from "../functions/resolverfunction.js";
import { Customers, Guarantor } from "../utils/data.js";
import { GraphQLError } from "graphql";



export const resolver = {
    Query: {
        customer: () => FetchAllUser(),
        guarantor: (_, { customerid }, contextValue) => GetGuarantorByUserId(Customers, customerid)
    },

    Mutation: {
        customerLogin:(_, {input}) => CusomerLogins(input),
        customerReg:(_, {input}) => CustomerReg(input),
        AddGuarantor:(_, { input}) => CreateGuarantor(input),
        editCustomerProfile:(_, {input}, {authorized}) =>{
            if (!authorized || !authorized.userId) {
                throw new GraphQLError('You must be logged in to update your profile', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            EditCustomerProfile(input)}
    }
};
