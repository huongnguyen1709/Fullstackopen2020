import React from 'react';
import Part from './Part';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description {
  description: string;
}

interface CourseNormalPart extends CoursePartBase, Description {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, Description {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase, Description {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, index) => {
        let component;
        switch (part.type) {
          case 'normal':
            component = (
              <Part
                key={index}
                name={part.name}
                description={part.description}
              />
            );
            break;
          case 'groupProject':
            component = (
              <Part
                key={index}
                name={part.name}
                groupProjectCount={part.groupProjectCount}
              />
            );
            break;
          case 'submission':
            component = (
              <Part
                key={index}
                name={part.name}
                description={part.description}
                exerciseSubmissionLink={part.exerciseSubmissionLink}
              />
            );
            break;
          case 'special':
            component = (
              <Part
                key={index}
                name={part.name}
                description={part.description}
                requirements={part.requirements}
              />
            );
            break;
          default:
            break;
        }
        return component;
      })}
    </>
  );
};

export default Content;
