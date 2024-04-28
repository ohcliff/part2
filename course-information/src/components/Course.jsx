import React from 'react';

const Header = ({ name }) => (
    <h1>{name}</h1>
);

const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => {
        return total += part.exercises},0)
    return (
        <div>
            <p><strong>total of {sum} exercises</strong></p>
        </div>
    )
}
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>  (
    <div>
    {parts.map(part => (
        <Part key={part.id} part={part} />
    ))}
    </div>
);

const Course = ({course}) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)
export default Course

