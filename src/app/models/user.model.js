// import mongoose,{ Schema } from "mongoose";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'




// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: [true,"Name is Required"]
//     },
//     phone: {
//         type: Number,
//         required: [true,"Phone number is required"]
//     },
//     dob: {
//         type: Date,
//         required: [true,"Date of birth is required"]
//     },
//     password: {
//         type: String,
//         required: [true,"Password is required"]
//     },
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         required: [true,"Email is required"]
//     },
//     isVerified: {
//         type:Boolean,
//         default: false
//     },
//     timeOfBirth: {
//         type: String,
//         required: [true,"Time of Birth is required"]
//     },
//     placeOfBirth: {
//         type: String,
//         required: [true,"Place of birth is required"]
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },
//     refreshToken: {
//         type: String 
//     },
//     verifyToken: String,
//     verifyTokenExpiry:Date
// },
//     {timestamps: true}
// );

// userSchema.pre('save',async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10);
//         next();
//     }
//     next();
// })

// userSchema.methods.generateAccessToken = async function(){
//     return jwt.sign({
//         _id: this._id
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//     }
// )
// }


// userSchema.methods.isPasswordCorrect = async function(password){
//     const isCorrect =  await bcrypt.compare(password,this.password)
//     return isCorrect;
// }

// export const User = mongoose.models.User || mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Email is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    timeOfBirth: {
        type: String,
        required: [true, "Time of Birth is required"]
    },
    placeOfBirth: {
        province: {
            type: String,
            required: [true, "Province is required"]
        },
        district: {
            type: String,
            required: [true, "District is required"]
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    verifyToken: String,
    verifyTokenExpiry: Date
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id: this._id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.isPasswordCorrect = async function(password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    return isCorrect;
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);