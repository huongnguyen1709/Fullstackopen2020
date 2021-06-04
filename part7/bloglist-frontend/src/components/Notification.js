import React from 'react';

const Notification = ({ notification, error }) => {
  const notiStyle = {
    display: notification === null ? 'none' : 'flex',
    width: '90%',
    backgroundColor: 'lightgrey',
    border: error ? '3.5px solid red' : '3.5px solid green',
    borderRadius: '5px',
    fontSize: '20px',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    color: error ? 'red' : 'green',
    marginBottom: '20px',
  };
  return (
    <div className='notification' style={notiStyle}>
      {notification}
    </div>
  );
};

export default Notification;
