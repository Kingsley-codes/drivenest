import mongoose from "mongoose";
import validator from 'validator';


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username cannot exceed 30 characters']
        },
        googleId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            minlength: [8, 'Password must be at least 8 characters'],
            select: false
        },

        address: {
            type: String,

        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: String,
        emailVerificationExpires: Date,
        oauthProviders: {
            google: String,
            facebook: String,
            instagram: String
        },
        phone: {
            type: String,

        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: Date
    },
    {
        timestamps: true,
    }
);

userSchema.index({ googleId: 1 });

const User = mongoose.model("User", userSchema);

export default User;
