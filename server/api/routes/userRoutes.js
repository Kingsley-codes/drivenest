import express from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUser } from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';
import { rateLimit } from 'express-rate-limit';
import { check } from 'express-validator';
import { validate } from '../middlewares/validation.js';


const router = express.Router();
