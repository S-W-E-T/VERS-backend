import mongoose, { Document, Schema } from "mongoose";

// Define an interface representing a user document in MongoDB
export interface IUser extends Document {
  photoUrl?: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string; // hashed password
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a schema corresponding to the document interface
const UserSchema: Schema<IUser> = new Schema(
  {
    photoUrl: {
      type: String,
      required: false, // optional field
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
