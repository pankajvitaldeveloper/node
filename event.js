// below code for event emitter
const express = require('express');
const app = express();
const EventEmitter = require('events');
const notificationEmitter = new EventEmitter();

// Middleware to parse JSON bodies
app.use(express.json());

// User database (simplified for example)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Notification handlers
notificationEmitter.on('userLogin', (user) => {
  console.log(`Notification: User ${user.name} has logged in at ${new Date().toLocaleTimeString()}`);
  // In a real app, this might send an email or push notification
});

notificationEmitter.on('userLogout', (user) => {
  console.log(`Notification: User ${user.name} has logged out at ${new Date().toLocaleTimeString()}`);
});

notificationEmitter.on('userUpdate', (user) => {
  console.log(`Notification: User ${user.name}'s profile was updated at ${new Date().toLocaleTimeString()}`);
});

// Routes
app.get('/', (req, res) => {
  res.send('Notification System API');
});

// Login route
app.post('/login', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (user) {
    notificationEmitter.emit('userLogin', user);
    res.json({ message: `Welcome back, ${user.name}!` });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (user) {
    notificationEmitter.emit('userLogout', user);
    res.json({ message: `Goodbye, ${user.name}!` });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update profile route
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    // In a real app, you would update the user data here
    notificationEmitter.emit('userUpdate', user);
    res.json({ message: `Profile updated for ${user.name}` });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Try these endpoints:');
  console.log('  POST /login with body: { "userId": 1 }');
  console.log('  POST /logout with body: { "userId": 1 }');
  console.log('  PUT /users/1');
});
