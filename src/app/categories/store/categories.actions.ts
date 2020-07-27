import { Action } from '@ngrx/store';
import { Category } from '../category.model';



export const GET_CATEGORIES = '[Categories] Get Categories';
export const SET_CATEGORIES = '[Categories] Set Categories';
export const SELECT_CATEGORY ='[Categories] Select Category';
export const SELECT_TAG ='[Categories] Select Tag';
export const ADD_CATEGORY_START ='[Categories] Add Category Start';
export const ADD_CATEGORY_SUCCESS ='[Categories] Add Category Success';
export const DELETE_CATEGORY_START = '[Categories] Delete Category Start';
export const DELETE_CATEGORY_SUCCESS = '[Categories] Delete Category Success';
export const UPDATE_CATEGORY_START = '[Categories] Update Category Start';
export const UPDATE_CATEGORY_SUCCESS = '[Categories] Update Category Success';

export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;
  constructor() { };
}
export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;
  constructor(public payload: Category[]) { };
}

export class SelectCategory implements Action {
  readonly type = SELECT_CATEGORY;
  constructor(public payload: Category) { };
}

export class DeleteCategoryStart implements Action {
  readonly type = DELETE_CATEGORY_START;
  constructor(public payload: string) { };
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;

}

export class SelectTag implements Action {
  readonly type = SELECT_TAG;
  constructor(public payload: {postsPerPage: number, currentPage: number, currentTag: string }) { };
}

export class AddCategoryStart implements Action {
  readonly type = ADD_CATEGORY_START;
  constructor(public payload: {name: string, tags: string[]}) { };
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;
  constructor(public payload: {message: string, category: Category}) { };
}

export class UpdateCategoryStart implements Action {
  readonly type = UPDATE_CATEGORY_START;
  constructor(public payload: { category: Category}) { };
}

export class UpdateCategorySuccess implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: { category: Category}) { };
}


export type CategoriesActions = SetCategories
 | GetCategories
 | SelectCategory
 | SelectTag
 | AddCategoryStart
 | AddCategorySuccess
 | DeleteCategoryStart
 | DeleteCategorySuccess
 | UpdateCategoryStart
 | UpdateCategorySuccess;

