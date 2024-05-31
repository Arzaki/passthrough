//serviceWorker.js

console.log("Hello, this is a service worker")

const showLocalNotification = (title, data, swRegistration) => {
    swRegistration.showNotification(title, data);
  };
  