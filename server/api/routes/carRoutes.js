import express from 'express';
import {
    createCar,
    getCarById,
    getCars
} from '../controllers/carController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const carRouter = express.Router();


// Car CRUD routes
carRouter.post('/add', uploadMiddleware, createCar);
carRouter.get('/', getCars);
carRouter.get('/:_id', getCarById);


export default carRouter;