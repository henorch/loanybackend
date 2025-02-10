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
    type Customers {
        id: ID!
        username: String!
        password: String!
        name: String!
        telephone: String!
        address: String!
        gender: String!
        nin: String!
        regnum: String!
        token: String
        guarantors: [Guarantor]  
    }

    type Query {
        customer: [Customers] 
        guarantor(customerid: ID!): [Guarantor] 
    }

    type Mutation {
         customerLogin(input: LoginInput): Customers
}
`;