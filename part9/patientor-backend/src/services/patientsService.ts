import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';
import { NonSensitivePatientsEntry, NewPatientsEntry, PatientsEntry  } from '../types';

const patients: PatientsEntry[] = patientsData;

const getEntries = (): PatientsEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation
      }));
  };

  const addPatients = ( entry: NewPatientsEntry ): PatientsEntry => {
    const newPatientsEntry = {
      id: uuid(),
      ...entry
    };
    patients.push(newPatientsEntry);
    return newPatientsEntry;
  };

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients
};