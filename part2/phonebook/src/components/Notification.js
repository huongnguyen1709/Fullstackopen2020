import React from 'react'

const Notification = ({ error, message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={error ? 'error message' : 'success message'}>
            {message}
        </div>
    )
}

export default Notification;