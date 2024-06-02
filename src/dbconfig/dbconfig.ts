import { error } from "console";
import mongoose from "mongoose";

const connect = async()=>{
    try {
      mongoose.connect(process.env.URI!)
      const connection = mongoose.connection;
      connection.on('connected', ()=>{
        console.log("DataBase Is Connected successfully")
      })
      connection.on('error', ()=>{
        console.log('MongoDb Error Connection. Please make sure MongoDb is running' +error);
        process.exit();
      })
         

    } catch (error) {
        console.error(error)
    }
}
export default connect;