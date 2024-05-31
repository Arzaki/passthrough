import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function SendNotification() {
  const [notification, setNotification] = useState('');
  const [socket, setSocket] = useState(null); // State variable to store the socket instance

  useEffect(() => {
    const serverUrl = 'ws://localhost:300'; // WebSocket server URL
    const newSocket = io(serverUrl);
    setSocket(newSocket); // Store the socket instance in state

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Cleanup function to disconnect the socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSendNotification = () => {
    if (socket) {
      const notificationData = {
        message: notification,
        timestamp: new Date().toISOString(),
      };

      // Emit 'notification' event to server with notification data
      socket.emit('notification', notificationData);
      setNotification(''); // Clear input field after sending notification
    } else {
      console.error('Socket connection not established.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
        placeholder="Enter notification message"
      />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
}

export default SendNotification;