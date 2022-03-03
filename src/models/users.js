import mongoose from "mongoose";
//calling Schema instance from mongoose using destructing
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
//user.createIndexes();

export default User;
