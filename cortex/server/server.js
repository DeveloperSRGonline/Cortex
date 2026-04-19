const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeSocket } = require('./socket/socket.server');
const connectToDatabase = require('./db/db');

// Middleware
const errorHandler = require('./middleware/ErrorHandler');
const requestLogger = require('./middleware/RequestLogger');

// Routes
const projectRoutes = require('./routes/project.routes');

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());

// Middleware
app.use(requestLogger);

// Routes
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Cortex API is running' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

// Connect to database before starting server
connectToDatabase().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
