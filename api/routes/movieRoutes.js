import express from 'express';
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getMovies,
  randomMovie,
} from '../controllers/movieController';
import { protect, isAdmin } from '../controllers/authController';

const router = express.Router();

router.use(protect);

router.route('/').get(getMovies).post(isAdmin, createMovie);
router.route('/:id').patch(isAdmin, updateMovie).delete(isAdmin, deleteMovie);

router.get('/find/:id', getMovie);

router.get('/random', randomMovie);

export default router;
