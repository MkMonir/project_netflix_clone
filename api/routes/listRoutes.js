import express from 'express';
import { cretateList, getLists } from './../controllers/listController';
import { isAdmin, protect } from './../controllers/authController';

const router = express.Router();

router.use(protect);

router.route('/').post(isAdmin, cretateList).get(getLists);

export default router;
