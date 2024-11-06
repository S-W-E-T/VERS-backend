import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user_model';
import { Location } from '../constants/location';

// Interface for the Schedule model
export interface ISchedule extends Document {
  userId: IUser['_id'];
  location: Location;
  timeIn: Date;
  timeOut: Date;
  isPresent: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Schedule schema with type annotation
const ScheduleSchema: Schema<ISchedule> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      enum: Location,
      required: true,
    },
    timeIn: {
      type: Date,
      required: true,
    },
    timeOut: {
      type: Date,
      required: true,
    },
    isPresent: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
export const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);