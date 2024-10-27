import mongoose, { Schema, Document } from "mongoose";
import { Location } from "../constant/location";
// Interface for the Entry model
export interface EntryDocument extends Document {
  name: string;
  purpose: string;
  inTime: Date;
  outTime?: Date;
  location: Location;
  description?: string;
}

// Define the Entry schema with type annotation
const entrySchema: Schema<EntryDocument> = new Schema(
  {
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    inTime: { type: Date, required: true },
    outTime: { type: Date }, // Optional
    location: { type: String, enum: Location, required: true },
    description: { type: String, default: "" }, // Optional
  },
  { timestamps: true }
);

// Export the Entry model
export const Entry = mongoose.model<EntryDocument>("Entry", entrySchema);
