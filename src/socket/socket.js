import { io } from 'socket.io-client';

// Backend url
const clientURL = 'https://zonochat-api.fly.dev/';

// Connect to socket
const socket = io(clientURL);

socket.emit('connection');

// Export socket
export default socket;
