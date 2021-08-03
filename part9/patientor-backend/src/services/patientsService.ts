import patientsData from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { PublicPatient, NewPatient, Patient , Entry } from '../types';
import {toNewPatientsEntry} from "../utils";

const patients: Patient[] = patientsData.map(obj => {
  const object = toNewPatientsEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation
      }));
  };

  const addPatients = ( data: NewPatient ): Patient => {
    const newPatientsEntry = {
      id: uuid(),
      ...data
    };
    patients.push(newPatientsEntry);
    return newPatientsEntry;
  };

  const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id)
    return patient;
  };

  
  const addEntry = (patientId:string, newEntry: Entry): Entry => {
  const patient : Patient | undefined = patients.find(p => p.id === patientId)
  if(patient && patient.entries) patient.entries.push(newEntry);
  
  return newEntry;
}



export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients, 
  getPatient,
  addEntry
};