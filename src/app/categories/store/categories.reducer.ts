
import * as CategoriesActions from './categories.actions';
import { Category } from '../category.model';

export interface State {
  categoriesList: Category[];
  currentCategoryId: string;
  currentCategory: Category;
  currentTag: string;
}

const initialState: State = {
  categoriesList: [],
  currentCategoryId: null,
  currentCategory: null,
  currentTag: ""
}


export function categoriesReducer(state = initialState, action: CategoriesActions.CategoriesActions) {
  switch (action.type) {
    case CategoriesActions.GET_CATEGORIES:
      return {
        ...state,
      };

    case CategoriesActions.SET_CATEGORIES:
      return {
        ...state,
        categoriesList: action.payload
      };

    case CategoriesActions.ADD_CATEGORY_START:
      return {
        ...state,
      };

    case CategoriesActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoriesList: [...state.categoriesList, action.payload.category]
      };

    case CategoriesActions.SET_CATEGORIES:
      return {
        ...state,
        categoriesList: action.payload
      };

    case CategoriesActions.SELECT_CATEGORY:
      return {
        ...state,
        currentCategoryId: action.payload.id,
        currentCategory: action.payload
      };

      case CategoriesActions.SELECT_TAG:
        return {
          ...state,
          currentTag: action.payload.currentTag
        };


    case CategoriesActions.DELETE_CATEGORY_START:
      return {
        ...state,
      };

    case CategoriesActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoriesList: state.categoriesList.filter(category => category.id != state.currentCategoryId),
        currentCategoryId: null
      };
    case CategoriesActions.UPDATE_CATEGORY_START:
      return {
        ...state,
      };
    case CategoriesActions.UPDATE_CATEGORY_SUCCESS:
      const updatedCategoriesList = [...state.categoriesList];
      const updatedCategory = state.categoriesList.filter(category => category.id == state.currentCategoryId)[0];
      const updatedCategoryIndex = state.categoriesList.indexOf(updatedCategory);
      updatedCategoriesList[updatedCategoryIndex] = action.payload.category;
      return {
        ...state,
        categoriesList: updatedCategoriesList,
        currentCategoryId: null
      };

    default:
      return {
        ...
        state
      };

  }

}
