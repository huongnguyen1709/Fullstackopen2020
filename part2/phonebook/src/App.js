import React, { useState, useEffect } from 'react'
import { getAll, create, Delete, update } from './services/users'

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

const App = () => {
    var [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        getAll()
            .then(response => {
                setPersons(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const addNew = e => {
        e.preventDefault()
        const isChecked = persons.every(person => person.name.toLowerCase() !== newName)
        const newUser = { name: newName, number: newNumber }
        if (isChecked) {
            create(newUser)
                .then(res => {
                    setPersons(persons.concat(res.data))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            const index = persons.findIndex(person => person.name.toLowerCase() === newName)
            const id = persons[index].id
            const name = persons[index].name
            if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one ?`)) {
                onUpdate(id, newUser)
            }
        }
    }

    const onDelete = (objectID, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            Delete(objectID)
                .then(res => {
                    getAll()
                        .then(response => {
                            setPersons(response.data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onUpdate = (objectID, newObject) => {
        update(objectID, newObject)
            .then(res => {
                getAll()
                    .then(response => {
                        setPersons(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                console.log(err)
            })
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
                onHandleSubmit={addNew}
                newName={newName}
                newNumber={newNumber}
                onChangeName={e => setNewName(e.target.value)}
                onChangeNumber={e => setNewNumber(e.target.value)}
            />

            <h2>Numbers</h2>
            <Persons onDelete={onDelete} persons={persons} />
        </div>
    )
}

export default App