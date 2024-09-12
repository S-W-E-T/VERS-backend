import { Router } from 'express';
import {
  createEntry,
  updateEntry,
  getAllEntries,
  getEntryById,
  deleteEntry
} from '../controllers/entries_controller';

const router = Router();

// Create a new entry
router.post('/entries', createEntry);

// Update an existing entry
router.put('/entries/:id', updateEntry);

// Get all entries
router.get('/entries', getAllEntries);

// Get a specific entry by ID
router.get('/entries/:id', getEntryById);

// Delete an entry
router.delete('/entries/:id', deleteEntry);

export default router;
