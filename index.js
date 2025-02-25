import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from'@apollo/server/standalone'
import { typeDefs } from './typedef/typeDef.js'
import { resolver } from './resolver/rsolvers.js'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { CustomerReg } from './functions/resolverfunction.js'


const port = 4000


//Token verification
async function verifyToken(token) {
    if (!token) {
        throw new GraphQLError('Authentication token is required', {
            extensions: { code: 'UNAUTHENTICATED' }
        });
    }

    try {
    
        const tokenWithoutBearer = token.replace('Bearer ', '');

       
        const decoded = jwt.verify(tokenWithoutBearer, 'your-secret-key'); 

      
        return { userId: decoded.userId };
    } catch (error) {
        throw new GraphQLError('Invalid or expired token', {
            extensions: { code: 'UNAUTHENTICATED' }
        });
    }
}





//connecting to database

async function dbCon(){
    try {
        let con = mongoose.connect('mongodb+srv://henorch:marathon23@cluster0.yumzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
        if(!con) throw new Error('Connection fail')
        console.log('succession succesful')
    } catch (error) {
        throw new Error('cannot connect to database')
    }

}


const server = new ApolloServer({
    typeDefs,
    resolvers: resolver,
    introspection: true,    
});
const { url } = await startStandaloneServer(server, {
    
    
    context: async ({req}) => {
        const path = req.body.operationName;
        if(path == 'customerReg' ||'customerLog'){
            return {}
        }

        const token = req.headers.authorization || '';

        const authorized = await verifyToken(token);

        return({authorized})
    },
    
    listen: {port}
})

await dbCon(), 

console.log(`serevr now running at ${url}`);