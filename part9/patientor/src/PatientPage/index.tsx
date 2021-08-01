import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

import { Header, Icon } from 'semantic-ui-react';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ fetchPatient }, dispatch] = useStateValue();
  let patient: Patient | undefined;

  useEffect(() => {
    patient = fetchPatient.find((patient) => patient.id === id);
    if (!patient) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: 'SET_PATIENT', payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  });
  patient = fetchPatient.find((patient) => patient.id === id);

  return (
    <div>
      <Header as='h2'>
        {patient && patient.name}{' '}
        <span>
          <Icon
            name={patient && patient.gender === 'male' ? 'mars' : 'venus'}
          />
        </span>
      </Header>

      <div>ssn: {patient && patient.ssn ? patient.ssn : null}</div>
      <div>occupation: {patient && patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
