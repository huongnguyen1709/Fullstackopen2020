import patientsData from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { PublicPatient, NewPatientsEntry, Patient  } from '../types';
import toNewPatientsEntry from "../utils";

const patientsEntries: Patient[] = patientsData.map(obj => {
  const object = toNewPatientsEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patientsEntries;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
    return patientsEntries.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation
      }));
  };

  const addPatients = ( entry: NewPatientsEntry ): Patient => {
    const newPatientsEntry = {
      id: uuid(),
      ...entry
    };
    patientsEntries.push(newPatientsEntry);
    return newPatientsEntry;
  };

  const getPatient = (id: string): Patient | undefined => {
    console.log(patientsEntries)
    const patient = patientsEntries.find(p => p.id === id)
    return patient;
  };



export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients, 
  getPatient
};