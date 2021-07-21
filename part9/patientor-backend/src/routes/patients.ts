import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatients = {
    name, 
    dateOfBirth, 
    ssn, 
    gender, 
    occupation
  }
  const newPatientsEntry = patientsService.addPatients(newPatients);
  res.json(newPatientsEntry);
});

export default router;