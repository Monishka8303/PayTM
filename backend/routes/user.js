const express=require('express')
const zod=require('zod')
const jwt=require('jsonwebtoken')

const {User, Account}=require('../db')
const JWT_SECRET=require('../config') 
const authMiddleware = require('../middleware')

const router=express.Router()

// 1. Signup Route
// zod validation schema for signup
const signupSchema=zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

//route
router.post('/signup',async (req,res)=>{
    const {success} = signupSchema.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    
    const existingUser=await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const dbUser=await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    });
    
    // creating a new account
    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    })
    
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})


// 2. Signin Route
// zod validation schema for signup
const signinSchema=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

// route
router.post('/signin', async(req,res)=>{
    const body=req.body;
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const existingUser=await User.findOne({
        username: body.username,
        password: body.password
    })

    if(existingUser){
        const token=jwt.sign({userId:existingUser._id},JWT_SECRET)
        res.status(200).json({
            firstName: existingUser.firstName,
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
    
})


// 3. Update Route
// zod validation schema for update
const updateSchema=zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

// route
router.patch('/',authMiddleware, async (req,res) => {
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const user=await User.findByIdAndUpdate({_id:req.userId},req.body);
    res.status(200).json({
        message: "Updated successfully"
    })
})

// 4. Search router

router.get('/bulk', async(req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map( (user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=router;