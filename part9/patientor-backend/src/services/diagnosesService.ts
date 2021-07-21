import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};