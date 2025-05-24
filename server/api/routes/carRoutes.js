import express from 'express';
import {
    createCar,
    getCars
} from '../controllers/carController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const carRouter = express.Router();


// Car CRUD routes
carRouter.post('/add', uploadMiddleware, createCar);
carRouter.get('/', getCars);

export default carRouter;