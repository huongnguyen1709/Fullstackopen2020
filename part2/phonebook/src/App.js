import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import { getAll, create, Delete, update } from './services/persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    var [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

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
        const isChecked = persons.every(person => person.name.toLowerCase() !== newName.toLowerCase())
        const newUser = { name: newName, number: newNumber }
        if (isChecked) {
            create(newUser)
                .then(res => {
                    setPersons(persons.concat(res.data))
                    setNewName('')
                    setNewNumber('')

                    setMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setMessage(`Information of ${newObject.name} has already been removed from server`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .then(() => {
                getAll()
                    .then(response => {
                        setPersons(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                setNewName('')
                setNewNumber('')
            }
            )
    }

    if (filterName && filterName !== '') {
        persons = persons.filter(person => {
            return person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        })
    }

    return (
        <div style={{ marginLeft: '10px', fontSize: '20px' }}>
            <h2>Phonebook</h2>
            <Notification error={error} message={message} />
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