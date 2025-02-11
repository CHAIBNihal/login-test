import mongoose, {Schema} from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:[true, "Please Enter a username"],
            unique:true
        },
        email: {
            type:String,
            required:[true, "Please Enter a valid email"],
            unique:true
        }, 
        password: {
            type:String,
            required:[true, "Please Enter a valid password"],

        },

        isVerified:{
            type:Boolean,
            default:false,
        },

        isAdmin:{
            type:Boolean,
            default:false,
        },
        forgotPasswordToken :String,
        forgotPasswordExpiry: Date,
        verifyToken:String,
        verifyTokenExpiry:Date,

    },
    

    {
        timestamps:true,
    }

)
const User =  mongoose.models.users || mongoose.model("users", UserSchema);
export default User;