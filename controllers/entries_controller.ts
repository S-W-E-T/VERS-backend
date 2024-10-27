import { Request, Response } from 'express';
import { Entry } from '../models/entries_model'; // Importing the model

// Create a new entry
export const createEntry = async (req: Request, res: Response) => {
  try {
    const { name, purposeOfVisit, inTime, outTime, description } = req.body;

    // Validation
    if (!name || !purposeOfVisit || !inTime) {
      return res.status(400).json({ message: 'Name, purpose of visit, and inTime are required.' });
    }

    // Create a new entry document
    const newEntry = new Entry({
      name,
      purposeOfVisit,
      inTime,
      outTime: outTime || null,  // If no outTime provided
      description: description || '', // Default description if none
    });

    await newEntry.save();
    return res.status(201).json({ message: 'Entry created successfully', entry: newEntry });
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error creating entry', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Update an existing entry
export const updateEntry = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    const { name, purposeOfVisit, inTime, outTime, description } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      {
        name,
        purposeOfVisit,
        inTime,
        outTime,
        description,
      },
      { new: true }  // Return the updated document
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    return res.status(200).json({ message: 'Entry updated successfully', entry: updatedEntry });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error updating entry', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Get all entries
export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.find();
    return res.status(200).json(entries);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error retrieving entries', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Get a single entry by ID
export const getEntryById = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    return res.status(200).json(entry);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error retrieving entry', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Delete an entry
export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    const deletedEntry = await Entry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    return res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error deleting entry', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
