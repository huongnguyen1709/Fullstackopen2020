export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }


  
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
// export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>
export type NewPatientsEntry = Omit<Patient, 'id'>;

