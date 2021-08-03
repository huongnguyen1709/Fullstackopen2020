import React from 'react';
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';

const EntryDetails = ({ entries }: { entries: Entry[] | undefined }) => {
  return (
    <>
      {entries &&
        entries.map((e, index) => {
          let component;
          switch (e.type) {
            case 'Hospital':
              return (
                <HospitalEntry
                  key={index}
                  date={e.date}
                  description={e.description}
                />
              );

            case 'OccupationalHealthcare':
              return (
                <OccupationalEntry
                  key={index}
                  date={e.date}
                  name={e.employerName}
                  description={e.description}
                />
              );

            case 'HealthCheck':
              return (
                <HealthCheckEntry
                  key={index}
                  date={e.date}
                  description={e.description}
                  healthCheckRating={e.healthCheckRating}
                />
              );

            default:
              break;
          }
          return component;
        })}
    </>
  );
};

export default EntryDetails;
