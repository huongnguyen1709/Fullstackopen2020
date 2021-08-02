import React from 'react';
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';

const EntryDetails = ({ entries }: { entries: Entry[] | undefined }) => {
  return (
    <>
      {entries &&
        entries.map((e) => {
          let component;
          switch (e.type) {
            case 'Hospital':
              return (
                <HospitalEntry date={e.date} description={e.description} />
              );

            case 'OccupationalHealthcare':
              return (
                <OccupationalEntry
                  date={e.date}
                  name={e.employerName}
                  description={e.description}
                />
              );

            case 'HealthCheck':
              return (
                <HealthCheckEntry
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
