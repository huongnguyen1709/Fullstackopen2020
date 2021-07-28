import { Gender, NewPatientsEntry } from './types';

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
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

const toNewPatientsEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name: parseData(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseData(ssn),
    gender: parseGender(gender),
    occupation: parseData(occupation),
    entries: []
  }

  return newEntry;
}

export default toNewPatientsEntry;