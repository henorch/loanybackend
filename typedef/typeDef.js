export const typeDefs = `#graphql
    type Guarantor { 
        name: String!
        telephone: String!
        address: String!
        gender: String!
    }
     input LoginInput {
        username: String!
        password: String!
     }
    type RegStatus{
        status: String!
    }

     type ProfileEditStatus{
        status: String!
    }
    type Customers {
        id: ID!
        username: String!
        password: String!
        name: String
        telephone: String
        address: String
        gender: String
        nin: String
        regnum: String
        token: String
        guarantors: [Guarantor]  
    }
    input ProfileInput {
        name: String!
        telephone: String!
        address: String
        gender: String
        nin: String
        regnum: String
    }
    input guaInput{
        name: String!
        telephone: String!
        address: String!
        gender: String!
    }

    type AuthPayload {
        token: String!
        user: Customers!
    }
 

    type Query {
        customer: [Customers]
        guarantor(customerid: ID!): [Guarantor] 
    }

    type Mutation {
         customerLogin(input: LoginInput): AuthPayload!
         customerReg(input: LoginInput): RegStatus!
         AddGuarantor(input: guaInput): RegStatus!
         editCustomerProfile(input: ProfileInput): ProfileEditStatus!
}
`;