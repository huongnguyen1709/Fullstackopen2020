import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';
import { apiBaseUrl } from '../constants';

import { setPatient, setDiagnosesList } from '../state/reducer';

import { Header, Icon, Button } from 'semantic-ui-react';

import EntryDetails from '../Entries/EntryDetails';
import { NewHealthCheckEntry } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { HealthCheckEntry } from '../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ fetchPatient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  let patient: Patient | undefined;

  const openModal = (): void => setModalOpen(true);
  const [error, setError] = React.useState<string | undefined>();
  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    patient = fetchPatient.find((patient) => patient.id === id);
    if (!patient) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };

      const fetchDiagnosesList = async () => {
        try {
          const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnosis/`
          );
          dispatch(setDiagnosesList(diagnosesListFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
      void fetchDiagnosesList();
    }
  });
  patient = fetchPatient.find((patient) => patient.id === id);

  const submitNewEntry = async (values: NewHealthCheckEntry) => {
    try {
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        { ...values, type: 'HealthCheck' }
      );
      dispatch({ type: 'ADD_ENTRY', payload: { id, values: newEntry } });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <Header as='h2'>
        {patient && patient.name}
        <span>
          <Icon
            name={patient && patient.gender === 'male' ? 'mars' : 'venus'}
          />
        </span>
      </Header>

      <div>ssn: {patient && patient.ssn ? patient.ssn : null}</div>
      <div>occupation: {patient && patient.occupation}</div>

      <Header as='h3'>entries</Header>

      <EntryDetails entries={patient && patient.entries} />

      {patient &&
        patient.entries.map((e) => (
          <div key={e.id}>
            <div>
              {e.date} {e.description}
            </div>
            <ul>
              {e.diagnosisCodes &&
                e.diagnosisCodes.map((c) => (
                  <li key={c}>
                    {c} {diagnoses[c] && diagnoses[c].name}
                  </li>
                ))}
            </ul>
          </div>
        ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
