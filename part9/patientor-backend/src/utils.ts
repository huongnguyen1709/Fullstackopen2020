import { Gender, NewPatient,NewEntry, Entry, Diagnosis, Discharge, SickLeave, HealthCheckRating} from './types';
import {v1 as uuid} from 'uuid';

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: Entry[]};
type EntryFields = { description : unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, discharge: Discharge, employerName: unknown, sickLeave?: SickLeave, healthCheckRating: unknown};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };


  const isDiagnosisCodes = (param: any): param is Array<Diagnosis['code']> => {
    return param
  };

  const parseData = (data: unknown): string => {
    if (!data || !isString(data)) {
        throw new Error(`Incorrect or missing ${data}: ` + data);
    }
    return data;
  };

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
    if (diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect Diagnosis Codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
  };

  type Entrytype = 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare'
  const isType = (param: any): param is Entrytype => {
    return param
  };

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return param
  };


  const parseType = (type: unknown): Entrytype => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type
  };

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect Diagnosis Codes: ' + healthCheckRating);
    }
    return healthCheckRating;
  };


export const toNewPatientsEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseData(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseData(ssn),
    gender: parseGender(gender),
    occupation: parseData(occupation),
    entries: entries
  }

  return newPatient;
}

export const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating }: EntryFields): Entry => {
  const newEntryBase : Entry = {
    description: parseData(description),
    date: parseDate(date),
    specialist: parseData(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    type: parseType(type)
  }
  
  let newEntryData: NewEntry

  switch (newEntryBase.type) {
    case 'Hospital':
      newEntryData = {
        ...newEntryBase,
        type:'Hospital',
        discharge
      }
      break;
    case 'OccupationalHealthcare':
      newEntryData = {
        ...newEntryBase,
        type:'OccupationalHealthcare',
        employerName: parseDate(employerName),
        sickLeave
      }
     break;
    case 'HealthCheck':
      newEntryData = {
        ...newEntryBase,
        type:'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      }
   break;
    default:
      break;
  }

  return newEntryData;
}