import express from 'express';

import patientsService from '../services/patientsService';
import {toNewPatientsEntry, toNewEntry} from "../utils";

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

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id

    const patient = patientsService.getPatient(id);
    patient ? res.json(patient) : res.status(404).send('Patient is not found');
   
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log('post')
    const patientId = req.params.id
    
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(patientId,newEntry);
    res.json(addedEntry);
  } catch (e) {
    console.log('error')
    res.status(400).send(e.message);
  }
});

export default router;