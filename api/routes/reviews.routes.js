import express from 'express';
import { getGoogleReviews } from '../controllers/reviews.controller.js';

const reviewsRouter = express.Router();

reviewsRouter.get('/getReviews', getGoogleReviews);



export default reviewsRouter;