import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Entry model
export interface EntryDocument extends Document {
  name: string;
  purposeOfVisit: string;
  inTime: Date;
  outTime?: Date;
  description?: string;
}

// Define the Entry schema with type annotation
const entrySchema: Schema<EntryDocument> = new Schema({
  name: { type: String, required: true },
  purposeOfVisit: { type: String, required: true },
  inTime: { type: Date, required: true },
  outTime: { type: Date }, // Optional
  description: { type: String, default: '' }, // Optional
}, { timestamps: true });

// Export the Entry model
export const Entry = mongoose.model<EntryDocument>('Entry', entrySchema);
