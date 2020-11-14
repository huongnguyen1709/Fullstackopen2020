import React from 'react'

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

export default PersonForm;