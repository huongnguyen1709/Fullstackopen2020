import React from 'react';

const Part = ({
  name,
  description,
  groupProjectCount,
  exerciseSubmissionLink,
  requirements,
}: {
  name: string;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
  requirements?: string[];
}) => {
  return (
    <div>
      <h3>{name}</h3>
      {description && (
        <p>
          <em>{description}</em>
        </p>
      )}

      {groupProjectCount && (
        <p>
          <em>project exercises {groupProjectCount}</em>
        </p>
      )}

      {exerciseSubmissionLink && (
        <p>
          submit to
          <em>{exerciseSubmissionLink}</em>
        </p>
      )}

      {requirements && (
        <p>
          required skills:
          <em> {requirements.join(', ')}</em>
        </p>
      )}
    </div>
  );
};

export default Part;
