import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import User from '../models/user.model.js'
import Tokens from '../models/token.model.js'
import sendEmail from '../utils/sendMail.js'

const authAction = {}

authAction.findAllUser = async (req, res) => {
    try {
        const { resources } = await User.items.query({
            query: "SELECT * FROM root r",
            parameters: []
        }).fetchAll()

        return res.status(200).json(resources)
    } catch (error) {
        return res.status(500).json({
            "errors": error.message
        })
    }
}

authAction.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        if(!(name && email && password)){
            return res.status(400).json({
                'message': "Incomplete data. Please add all required field"
            });
        }

        const querySpec = {
            query: "select * from users u where u.email=@email",
            parameters: [
                {
                    name: "@email",
                    value: email
                }
            ]
        };

        const { resources } = await User.items.query(querySpec).fetchAll()
        
        if(resources.length !== 0 && resources[0].email === email){
            return res.status(409).json({
                "message": "User Already Exist! Please Login"
            })
        }

        await User.items.create({
            "name": name,
            "email": email,
            "password": encryptedPassword
        })

        return res.status(200).json({
            'msg': "User created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            "errors": error.message
        })
    }
}

authAction.signIn = async (req, res) => {
    res.status(200).json({
        'msg': 'signin user'
    })
} 

authAction.signOut = async (req, res) => {
    res.status(200).json({
        'msg': 'signOut user'
    })
} 

authAction.forgotPassword = async (req, res) => {
    try {
        const { email } = req.params

        const queryUser = {
            query: "select * from users u where u.email=@email",
            parameters: [
                {
                    name: "@email",
                    value: email
                }
            ]
        };

        const queryToken = {
            query: "select * from tokens t where t.email=@email",
            parameters: [
                {
                    name: "@email",
                    value: email
                }
            ]
        };

        const { resources } = await User.items.query(queryUser).fetchAll()
        const { resources: tokens } = await Tokens.items.query(queryToken).fetchAll()

        //console.log(tokens)

        if(resources.length === 0){
            await sendEmail(resources[0].email, "Password reset", 'No account found on email')
            return res.status(200).json({
                'message': 'Password reset link sent to your email account'
            })
        }

        if(tokens.length === 0){
            await Tokens.items.create({
                "email": email,
                "token": crypto.randomBytes(32).toString('hex')
            })
        }

        const link = `${process.env.BASE_URL}/password-reset/${resources[0].email}/${tokens[0].token}`
        await sendEmail(resources[0].email, "Password reset", link)

        return res.status(200).json({
            'message': 'Password reset link sent to your email account'
        })
    } catch (error) {
        return res.status(500).json({
            "errors": error.message 
        })
    }
}

authAction.resetPassword = (req, res) => {
    console.log(req.params)
    res.status(200).json({
        'msg': 'reset password'
    })
}

export default authAction