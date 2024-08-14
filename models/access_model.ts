import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user_model"; // Assuming the User model is in the same directory

// Define an enum for the role
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Define an interface representing an access document in MongoDB
export interface IAccess extends Document {
  _id: mongoose.Types.ObjectId;
  userId: IUser["_id"]; // Reference to the User model's _id field
  role: Role; // Role field using the enum
  accessApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AccessSchema: Schema<IAccess> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    role: {
      type: String,
      enum: Role, // Enum for role field
      required: true,
      trim: true,
      default: Role.USER,
    },
    accessApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // automatically create `createdAt` and `updatedAt` fields
  }
);

// Create a model from the schema
const Access = mongoose.model<IAccess>("Access", AccessSchema);

export default Access;
