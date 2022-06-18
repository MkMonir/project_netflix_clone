import express from 'express';

import {
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  getMe,
  updateMe,
  deleteMe,
  usersStat,
} from './../controllers/userController';
import { protect, isAdmin } from './../controllers/authController';

const router = express.Router();

router.use(protect);

router.route('/me').get(getMe, getUserById);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/usersStat').get(usersStat);

// note: RESTRICT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(isAdmin);

router.route('/').get(getUsers);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
