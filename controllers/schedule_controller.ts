import { Request, Response } from "express";
import { Schedule, ISchedule } from "../models/schedule_model";
import { IUser } from "../models/user_model";

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { userId, location, timeIn, timeOut, isPresent } = req.body;

    // Validation
    if (!userId || !location || !timeIn || !timeOut) {
      return res.status(400).json({
        message: "userId, location, timeIn and timeOut are required.",
      });
    }

    const newSchedule: ISchedule = new Schedule({
      userId,
      location,
      timeIn,
      timeOut,
      isPresent,
    });

    await newSchedule.save();
    return res
      .status(201)
      .json({ message: "Schedule created successfully", schedule: newSchedule });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error creating schedule", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const scheduleId = req.params.id;
    const { location, timeIn, timeOut, isPresent } = req.body;

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        location,
        timeIn,
        timeOut,
        isPresent,
      },
      { new: true } // Return the updated document
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res
      .status(200)
      .json({ message: "Schedule updated successfully", schedule: updatedSchedule });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error updating schedule", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const scheduleId = req.params.id;
    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error retrieving schedule", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find();
    return res.status(200).json(schedules);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error retrieving schedules", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};