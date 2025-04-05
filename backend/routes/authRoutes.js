import express from 'express';
const router = express.Router();
import {deleteUserBio, getUserBio, loginUser , registerUser, updateUserBio} from '../controllers/authController.js';
import { authCheck } from '../middleware/authCheck.js';

router.post('/login' , loginUser)
router.post('/register', registerUser)
router.get('/bio' , authCheck , getUserBio)
router.post('/bio', authCheck, updateUserBio)
router.delete('/bio', authCheck, deleteUserBio)

export default router;