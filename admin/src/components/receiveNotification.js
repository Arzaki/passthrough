import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function receiveNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const serverUrl = 'ws://localhost:300'; // WebSocket server URL
    const socket = io(serverUrl);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for 'receivedNotification' event from the server
    socket.on('receivedNotification', (data) => {
      console.log('Received notification:', data);

      // Show notification as an alert
      showNotificationAlert(data);
    });

    // Cleanup function to disconnect the socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to display notification as an alert
  const showNotificationAlert = (notification) => {
    // Use window.alert or custom modal/dialog to display notification
    const { message, timestamp } = notification;
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    const alertMessage = `New Notification:\n\nMessage: ${message}\nTimestamp: ${formattedTimestamp}`;
    window.alert(alertMessage);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <p>Listening for incoming notifications...</p>
    </div>
  );
}

export default receiveNotification;
