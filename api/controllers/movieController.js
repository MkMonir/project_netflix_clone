import { createOne, updateOne, deleteOne, getOne, getAll } from './handlerFactory';
import Movie from '../models/movieModel';
import catchAsync from './../utils/catchAsync';

export const createMovie = createOne(Movie);
export const updateMovie = updateOne(Movie);
export const deleteMovie = deleteOne(Movie);
export const getMovie = getOne(Movie);
export const getMovies = getAll(Movie);

export const randomMovie = catchAsync(async (req, res, next) => {
  const type = req.query.type;
  let movie;

  if (type === 'series') {
    movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
  } else {
    movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
  }

  res.status(200).json({
    status: 'success',
    data: movie,
  });
});
