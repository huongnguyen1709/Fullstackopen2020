import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const message = notification.message;
  const error = notification.error;

  const notiStyle = {
    display: message === '' ? 'none' : 'flex',
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
      {message}
    </div>
  );
};

export default Notification;
