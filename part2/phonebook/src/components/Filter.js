import React from 'react'

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

export default Filter;