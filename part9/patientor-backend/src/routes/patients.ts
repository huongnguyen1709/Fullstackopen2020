import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientsEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientsEntry = toNewPatientsEntry(req.body);

    const addedEntry = patientsService.addPatients(newPatientsEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;