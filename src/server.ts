import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { pool } from './config/database';
import loginRoutes from './routes/login';
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
