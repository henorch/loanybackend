import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from'@apollo/server/standalone'
import { typeDefs } from './typedef/typeDef.js'
import { resolver } from './resolver/rsolvers.js'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'


const port = 4000
//connecting to database

async function dbCon(){
    let con = mongoose.connect('mongodb+srv://henorch:marathon23@cluster0.yumzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
    if(!con) console.log('connection fail')
    console.log('succession succesful')
}


const server = new ApolloServer({
    typeDefs,
    resolvers: resolver,
    introspection: true,  
    playground: true,    
});
const { url } = await startStandaloneServer(server, {
    
    context: async ({req}) => {
        const token = req.headers.authorization || '';

        const user = getUser(token)
        if(!user)
            throw GraphQLError('user is not uhenticatd', {
        extentions:{
            code:'UNAUTHENTICATED',
            http: { status: 401}
        }})
    },
    
    listen: {port}
})

await dbCon(), 

console.log(`serevr now running at ${url}`);