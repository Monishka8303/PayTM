require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected!"))

const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength:6
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);

module.exports={
    User,
    Account
}
