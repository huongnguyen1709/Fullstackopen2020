import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    var [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

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