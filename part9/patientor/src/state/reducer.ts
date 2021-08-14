import { State } from "./state";
import { Patient, Diagnosis, HealthCheckEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
    | {
      type: "ADD_ENTRY";
      payload:{id: string, values: HealthCheckEntry}
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":  
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      state.fetchPatient.push(action.payload);
      return {...state};
      case "SET_DIAGNOSES_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnoses
          }
        };

        case "ADD_ENTRY":
         state.fetchPatient.find(p => p.id === action.payload.id)?.entries.push(action.payload.values);     
      return {
        ...state
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi : Patient[]) : Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const setPatient = (patientFromApi : Patient) : Action => {
  return {
    type: 'SET_PATIENT',
    payload: patientFromApi
  };
};

export const setDiagnosesList = (diagnosesListFromApi : Diagnosis[]) : Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesListFromApi
  };
};
