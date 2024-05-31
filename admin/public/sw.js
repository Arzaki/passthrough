self.addEventListener('admin', e => {
    const data = e.data.json();
    console.log('Got push', data);
    self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'favicon.ico'
    });
    });