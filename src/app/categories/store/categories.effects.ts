import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map} from 'rxjs/operators';
import {  of } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import * as PostsActions from '../../posts/store/posts.actions';
import { Category } from '../category.model';
import { HttpClient } from '@angular/common/http';

const MY_URL = 'http://localhost:3000/api/';

@Injectable()
export class CategoriesEffects {

  constructor(private actions$: Actions, private http: HttpClient) { }

  @Effect()
  getCategories$ = this.actions$
    .pipe(
      ofType(CategoriesActions.GET_CATEGORIES),
      switchMap(_ => this.http.get<{
        message: string;
        tags: {
          _id: string,
          name: string,
          tags: { id: string, name: string }[]
        }[]
      }>(MY_URL + 'tags')
        .pipe(
          map(categoriesData => {
            return categoriesData.tags.map(category => new Category(category._id, category.name, category.tags))
          }),
          map(categories => {
            return (new CategoriesActions.SetCategories(categories));
          }),
          catchError(error => {
            let errorMessage = "An unknown error occured!";
            return of(new CategoriesActions.SetCategories(null))
          })
        )
      )
    );


  @Effect()
  addCategory$ = this.actions$
    .pipe(
      ofType(CategoriesActions.ADD_CATEGORY_START),
      switchMap(data => {
        return this.http.post<{ message: string, category: Category }>(MY_URL + 'tags', data['payload'])
          .pipe(
            map(newCategoryData => {
              const tags = newCategoryData.category['tags'].map(tag => {
                const newTags = { id: tag['_id'], name: tag['name'] };
                return newTags
              });
              console.log("data", newCategoryData);
              const newCategory = new Category(
                newCategoryData.category['_id'],
                newCategoryData.category['name'],
                tags
              );
              return (new CategoriesActions.AddCategorySuccess({ message: newCategoryData.message, category: newCategory }));
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new CategoriesActions.SetCategories(null))
            })
          )
      })
    );

  @Effect()
  removeCategory$ = this.actions$
    .pipe(
      ofType(CategoriesActions.DELETE_CATEGORY_START),
      switchMap(categoryId => {
        return this.http.delete(MY_URL + 'categories' + "/" + categoryId['payload'])
          .pipe(
            map(_ => {
              return (new CategoriesActions.DeleteCategorySuccess());
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new CategoriesActions.SetCategories(null))
            })
          )
      })
    );


  @Effect()
  updateCategory$ = this.actions$
    .pipe(
      ofType(CategoriesActions.UPDATE_CATEGORY_START),
      switchMap(categoryData => {
        console.log('effect data', categoryData['payload']);
        return this.http.put(
          (MY_URL + 'tags' + "/" + categoryData['payload']['category']['id']),
          categoryData['payload']['category']
        ).pipe(
            map(_ => {
              return (new CategoriesActions.UpdateCategorySuccess({ category: categoryData['payload']['category'] }));
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new CategoriesActions.SetCategories(null))
            })
          )
      })
    );

  @Effect()
  selectTag$ = this.actions$
    .pipe(
      ofType(CategoriesActions.SELECT_TAG),
      switchMap((tagData: {postsPerPage: number, currentPage: number, currentTag: string }) => {
        return of(new PostsActions.GetPosts({
          postsPerPage: tagData['payload']['postsPerPage'],
          currentPage: tagData['payload']['currentPage'],
          currentTag: tagData['payload']['currentTag'],
        }))

        })
      );

}
