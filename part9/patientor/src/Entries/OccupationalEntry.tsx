import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const OccupationalEntry = ({
  date,
  name,
  description,
}: {
  date: string;
  name: string;
  description: string;
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {date} <Icon name='doctor' /> {name}
        </Card.Header>

        <Card.Meta>
          <em>{description}</em>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default OccupationalEntry;
