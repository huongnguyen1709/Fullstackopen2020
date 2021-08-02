import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const HospitalEntry = ({
  date,
  description,
}: {
  date: string;
  description: string;
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
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
