import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sequelize } from './config/database'; 
import loginRoutes from './routes/login';
import publicationRoutes from './routes/publication';
import cors from 'cors'; 

const app = express();
dotenv.config();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', loginRoutes);
app.use('/api', publicationRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate() 
  .then(() => {
    console.log('Database connection successful!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
