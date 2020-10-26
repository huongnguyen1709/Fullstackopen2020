import React, { useState } from 'react'

const Filter = ({ filterName, onHandleChange }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            filter shown with: <input
                type='text'
                value={filterName}
                onChange={onHandleChange} />
        </div>
    )
}

const PersonForm = (props) => {
    const { onHandleSubmit, newName, newNumber, onChangeName, onChangeNumber } = props
    return (
        <form onSubmit={onHandleSubmit}>
            <div style={{ marginBottom: '20px' }}>
                name: <input
                    type='text'
                    value={newName}
                    onChange={onChangeName} />
            </div>
            <div style={{ marginBottom: '20px' }}>
                number: <input
                    type='tel'
                    value={newNumber}
                    onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons }) => {
    return (
        persons && persons.map((person, index) => {
            return (
                <div key={index}>
                    <p>{person.name} &nbsp; {person.number} </p>
                </div>
            )
        })
    )
}

const App = () => {
    var [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const onHandleSubmit = e => {
        e.preventDefault()
        const isChecked = persons.every(person => person.name.toLowerCase() !== newName)
        if (isChecked) {
            setPersons([
                ...persons,
                { name: newName, number: newNumber }
            ])
            setNewName('')
            setNewNumber('')
        }
        return isChecked ? null : window.alert(`${newName} is already added to phonebook`)
    }

    if (filterName && filterName !== '') {
        persons = persons.filter(person => {
            return person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        })
    }

    return (
        <div style={{ marginLeft: '10px', fontSize: '20px' }}>
            <h2>Phonebook</h2>
            <Filter
                filterName={filterName}
                onHandleChange={e => setFilterName(e.target.value)}
            />

            <h3>Add a new</h3>
            <PersonForm
                onHandleSubmit={onHandleSubmit}
                newName={newName}
                newNumber={newNumber}
                onChangeName={e => setNewName(e.target.value)}
                onChangeNumber={e => setNewNumber(e.target.value)}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    )
}

export default App