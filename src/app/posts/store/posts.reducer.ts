
import * as PostsActions from './posts.actions';
import { PostData, Comment, Post } from '../post.model';

export interface State {
  posts: Post[];
  currentPostId: string;
  maxPosts: number;
  postsPerPage: number;
  currentPage: number;

}

const initialState: State = {
  posts: [],
  currentPostId: null,
  maxPosts: 0,
  postsPerPage: 1,
  currentPage: 1

}


export function postsReducer(state = initialState, action: PostsActions.postsActions) {
  switch (action.type) {
    case PostsActions.GET_POSTS:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        postsPerPage: action.payload.postsPerPage,
      };

    case PostsActions.SET_POSTS:
      const transformedPosts = action.payload['posts'].map(post => {
        return { ...post }
      });
      return {
        ...state,
        posts: [...transformedPosts],
        maxPosts: action.payload.maxPosts
      };

    case PostsActions.GET_POSTS_ERROR:
      return {
        ...state,
      };

    case PostsActions.ADD_POST_START:
      return {
        ...state
      };
    case PostsActions.ADD_POST_SUCCESS:
      alert("Post is added");
      console.log('action.payload', action.payload);
      return {
        ...state,
       // posts: [...state.posts, action.payload]
      };


    case PostsActions.ADD_COMMENT_START:

      return {
        ...state,
        currentPostId: action.payload.postId
      };
    case PostsActions.ADD_COMMENT_SUCCESS:
      const postToAddComments = state.posts.filter(post => post.id == state.currentPostId)[0];
      const newComments = [...postToAddComments.comments, action.payload.comment];
      const updatedPost = { ...postToAddComments, comments: newComments };
      const postToAddCommentsIndex = state.posts.indexOf(postToAddComments);
      const newPostList = [...state.posts];
      newPostList[postToAddCommentsIndex] = updatedPost;

      return {
        ...state,
        posts: newPostList
      };

    case PostsActions.GET_COMMENTS_END:
      /*   const postToRemoveCommentsIndex = state.posts.indexOf(action.payload);
        const renovatedPost = { ...action.payload, isOpened: false };
        const postList = [...state.posts];
        postList[postToRemoveCommentsIndex] = renovatedPost; */

      return {
        ...state,
        //   posts: postList
      };

    default:
      return {
        ...
        state
      };

  }

}
