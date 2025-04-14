import express from 'express';
import { createNotificationsTest } from '../controllers/notificationController.js';

const router = express.Router();

router.route('/').post(createNotificationsTest);

export default router;
