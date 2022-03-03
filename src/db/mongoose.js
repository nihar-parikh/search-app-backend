import mongoose from "mongoose";

//mongodb+srv://admin:r06vY0209ICP67PR@cluster0.noojk.mongodb.net/ecommerceAPI?retryWrites=true&w=majority
const MONGO_URL =
  "mongodb+srv://admin:IrLkJ5WWrdLzfg1V@cluster0.bb23v.mongodb.net/searchApp";
const connection_URL = MONGO_URL;
// console.log(connection_URL);

//function for checking database connection
const connectToMongo = async () => {
  try {
    await mongoose.connect(connection_URL, {
      useNewUrlParser: true,
      autoIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongo successfully");
  } catch (error) {
    console.log(error);
  }
};

// mongoose.connection.once("open", () => {
//   console.log("DB connected");
// });

export default connectToMongo;

//IrLkJ5WWrdLzfg1V

//mongosh "mongodb+srv://cluster0.bb23v.mongodb.net/myFirstDatabase"
