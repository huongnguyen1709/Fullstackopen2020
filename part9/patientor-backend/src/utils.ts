import { Gender, NewPatient,NewEntry, Entry, Diagnosis, Discharge, SickLeave, HealthCheckRating} from './types';

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: Entry[]};
type EntryFields = { description : unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, discharge: unknown, employerName: unknown, sickLeave?: unknown, healthCheckRating: unknown};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };


  

  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ` + name);
    }
    return name;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ` + ssn);
    }
    return ssn;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ` + occupation);
    }
    return occupation;
  };

  const parseCriteria = (data: unknown): string => {
    if (!data || !isString(data)) {
        throw new Error(`Incorrect or missing criteria: ` + data);
    }
    return data;
  };

  const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ` + description);
    }
    return description;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ` + specialist);
    }
    return specialist;
  };

  const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect or missing employerName: ` + employerName);
    }
    return employerName;
  };

  

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
  };

  const parseDateOfDischarge = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of Discharge: ' + date);
    }
    return date;
  };

  const isDischarge = (param: any): Discharge => {
    const object : Discharge = {
      date: parseDateOfDischarge(param.date),
    criteria: parseCriteria(param.criteria),
    }
    return object
  };

  const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect discharge: ' + discharge);
    }
    return discharge as Discharge
  };

  const parseDateOfSickLeave = (date: unknown, startOrEnd: string): string => {
    const data = startOrEnd === 'start' ? 'startDate' : 'endDate'
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${data}: ` + date);
    }
    return date;
  };

  const isSickLeave = (param: any): SickLeave => {
    const object : SickLeave = {
      startDate: parseDateOfSickLeave(param.startDate, 'start'),
      endDate: parseDateOfSickLeave(param.endDate, 'end')
    }
    return object
  };

  const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect sickLeave: ' + sickLeave);
    }
    return sickLeave as SickLeave
  };

  const isDiagnosisCodes = (param: any): param is Array<Diagnosis['code']> => {
    return param
  };

  const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect Diagnosis Codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
  };

 

  type Entrytype = 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare'
  const isType = (param: any): param is Entrytype => {
    return param
  };

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };


  const parseType = (type: unknown): Entrytype => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type
  };

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
  };


export const toNewPatientsEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries
  }

  return newPatient;
}

export const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating }: EntryFields): NewEntry => {
  interface BaseEntryType {
    description: string;
    date: string;
    specialist: string;
    type: string,
    diagnosisCodes?: string[]
  }

    let newEntryBase : BaseEntryType = {
      description: parseDescription(description),
      date: parseDate(date),
      specialist: parseSpecialist(specialist),
      type: parseType(type)
    }
  
  if(diagnosisCodes) newEntryBase.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes)
  
  let newEntryData: NewEntry = {} as NewEntry

  switch (newEntryBase.type) {
    case 'Hospital':
      newEntryData = {
        ...newEntryBase,
        type:'Hospital',
        discharge: parseDischarge(discharge)
      } as NewEntry
      break;
    case 'OccupationalHealthcare':
      if (sickLeave) {
        newEntryData = {
          ...newEntryBase,
          type:'OccupationalHealthcare',
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave) 
        } as NewEntry
      }
      else newEntryData = {
        ...newEntryBase,
        type:'OccupationalHealthcare',
        employerName: parseEmployerName(employerName)
      } as NewEntry
     break;
    case 'HealthCheck':
      newEntryData = {
        ...newEntryBase,
        type:'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      } as NewEntry
   break;
    default:
      break;
  }

  return newEntryData;
}