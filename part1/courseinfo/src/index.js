import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <h3>{course.name}</h3>
    );
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}

const Content = ({ course }) => {
    const parts = course.parts
    return (
        <div>
            {
                parts.map(part => {
                    return <Part key={part.id} part={part} />
                })
            }
        </div>
    );
}

const Total = ({ course }) => {
    const parts = course.parts
    const sum = parts.reduce((acc, cur) => {
        return acc + cur.exercises
    }, 0)

    return (
        <h4>total of {sum} exercises</h4>
    );
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },

        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div style={{ marginLeft: '10px', fontSize: '20px' }}>
            <h2>Web development curriculum</h2>
            {
                courses && courses.map(course => {
                    return <Course key={course.id} course={course} />
                })
            }
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);