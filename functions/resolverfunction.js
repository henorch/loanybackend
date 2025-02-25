import { Guarantor } from "../Schema/GuarantorSchema.js";
import { Customers } from "../Schema/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

function generatedToken(user) {
    const payload = {
        id: user._id,
        user: user.username,
    };

    return jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }); // You can adjust the secret and expiration time as needed
}


async  function CusomerLogins(input){
    const { username, password} = input
    if(username == "" && password ==""){
        console.log('username and password cannot be empty');
        return;
    }
    try {
        let usernamecheck = await Customers.findOne({username})
        if(!usernamecheck){
            throw new Error('This username does not exist')
        }
        const validpassword =  bcrypt.compare(password, usernamecheck.password)
        if (!validpassword){
            throw new Error('wrong password please check')
        }
        return {
            token: generatedToken(usernamecheck),
            user: usernamecheck
            
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message); 
    }
}

async function CustomerReg(input){
        const { username, password} = input
        if(username == "" && password ==""){
            console.log('username and password cannot be empty');
            return;
        }
        try {
            let new_user = await Customers.create({username, password});
            if (new_user) return {
                status:' succefully registered'
            }
        } catch (error) {
            return {
                status:"registration failed"
            }
        }
      
} 



// Guarano side

async function CreateGuarantor(input){
    const { name, telephone, gender, address} = input
    if(!name || !telephone || !gender || !address){
        console.log('username and password cannot be empty');
        return;
    }
    try {
        let guarantor = Guarantor.create({...input});
        if (guarantor) return {
            status:'guarantor created'
        }
    } catch (error) {
        return {
            status:"registration failed"
        }
    }
  
} 

async function EditCustomerProfile(input, {authorized}){
    if (!authorized || !authorized.userId) {
        throw new GraphQLError('You must be logged in to update your profile', {
            extensions: { code: 'UNAUTHENTICATED' },
        });
    }
    const { name, telephone} = input
    console.log(name);
    return{
        status: 'profile updted'
    }

}


export { CusomerLogins,  CustomerReg, CreateGuarantor, EditCustomerProfile}