import userModel from "../Model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// creating register api
export function register(req, res) {

    const { fullName, email, password } = req.body;

    // check the email is already in database or not then create if no existence
    userModel.findOne({email: email}).then((data) => {

        if (!data) {

            // preparing data to send into database
            const newUser = new userModel({
                fullName,
                email,
                password: bcrypt.hashSync(password, 10)
            })

            newUser.save().then((data) => {
                res.status(201).json({message: "User Registration Successfull", User: data});
            })
        }
        else {
            return res.status(400).json({message: "User already exist"})
        }
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}


// creating login api 
export function login(req, res) {

    const { email, password } = req.body;

    userModel.findOne({email: email}).then((data) => {

        if (!data) {
            return res.status(400).json({message: "User is not registered"})
        }

        const isValidPassword = bcrypt.compareSync(password, data.password);

        if (!isValidPassword) {
            res.status(403).json({message: "Invalid Password"})
        }
        else {
            let token = jwt.sign({id: data._id}, "secretKey", {expiresIn: '10m'})

            console.log(token)
            res.json({User: data.fullName, email: data.email, accessToken: token})
        }
        
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}