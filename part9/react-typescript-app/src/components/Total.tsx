import React from 'react';

interface coursePart {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: coursePart[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
