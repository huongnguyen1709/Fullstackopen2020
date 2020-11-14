import React from 'react'

const Persons = (props) => {
    const { persons } = props
    return (
        persons && persons.map(person => {
            return (
                <div key={person.id}>
                    <p style={{ display: 'inline-block' }}>{person.name} &nbsp; {person.number} </p> &nbsp;
                    <button onClick={() => props.onDelete(person.id, person.name)}>delete</button>
                </div>
            )
        })
    )
}

export default Persons;