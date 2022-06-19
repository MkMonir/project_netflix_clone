import List from './../models/listModel';
import { createOne, deleteOne, updateOne, getOne, getAll } from './handlerFactory';

export const cretateList = createOne(List);
export const updateList = updateOne(List);
export const deleteList = deleteOne(List);
export const getLists = getAll(List);
