import React from 'react';
import { HealthCheckRating } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HealthCheckEntry = ({
  date,
  description,
  healthCheckRating,
}: {
  date: string;
  description: string;
  healthCheckRating: HealthCheckRating;
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {date} <Icon name='doctor' />
        </Card.Header>

        <Card.Meta>
          <em>{description}</em>
        </Card.Meta>
        <Icon
          name='heart'
          color={
            healthCheckRating == 0
              ? 'green'
              : healthCheckRating == 1
              ? 'yellow'
              : 'red'
          }
        />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;
