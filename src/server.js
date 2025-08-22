import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './controllers/contacts.js';

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pino({
    transport: {
      target: 'pino-pretty',
    },
  }));
  app.use(express.json());

  // Routes
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};