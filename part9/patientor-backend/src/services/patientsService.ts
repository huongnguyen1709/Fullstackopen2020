import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';
import { NonSensitivePatientsEntry, NewPatientsEntry, PatientsEntry  } from '../types';
import toNewPatientsEntry from "../utils";

const patientsEntries: PatientsEntry[] = patientsData.map(obj => {
  const object = toNewPatientsEntry(obj) as PatientsEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): PatientsEntry[] => {
  return patientsEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsEntries.map(({ id, name, dateOfBirth, gender, occupation}) => ({
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
    patientsEntries.push(newPatientsEntry);
    return newPatientsEntry;
  };

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients
};