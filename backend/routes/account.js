const express=require('express')
const {Account}=require('../db')
const authMiddleware=require('../middleware')
const {default:mongoose} = require('mongoose')

const router=express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId=req.userId;
    const account=await Account.findOne({userId});
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer',authMiddleware,async (req,res) => {

    const session =  await mongoose.startSession();

    session.startTransaction();
    const userId=req.userId;
    const {amount,to} = req.body;

    const account=await Account.findOne({
        userId
    }).session(session)

    if(account.balance<amount){
        await session.abortTranscation();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })
})

module.exports=router;