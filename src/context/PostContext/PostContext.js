import React, { useContext, createContext, useReducer } from 'react'
import { useUser } from '../UserContext/UserContext';
import { db } from '../../firebase';

const Context = createContext();
const usePosts = () => useContext(Context);
export { usePosts };

// post db reference
const postCollection = db.collection('posts');

// post reducer
const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST': return {
      ...state, posts: [...state.posts, action.payload]
    }
    case 'SET_POSTS':
      return { ...state, posts: action.payload }
    default: return state;
  }
}


// provider
const PostContext = ({ children }) => {
  const { user, addUserPost, setError, setLoading, profile } = useUser();
  const initialState = {
    posts: [],
  }

  const [state, dispatch] = useReducer(postReducer, initialState);
  
  // add a user post
  const addPost = async (post) => {
    setLoading(true);
    try {
      const postPath = await postCollection.doc();
      const fullPost = {
        postId: postPath.id,
        post,
        user: user.uid,
        profile: {
          name: profile.name || '',
          username: profile.username || '',
          profile_img: profile.profile_img || 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM=',
        },
        createdOn: Date.now(),
        likes: [user.uid]
      }
      await postPath.set(fullPost);
      dispatch({ type: 'ADD_POST', payload: fullPost })
      addUserPost(postPath.path);
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
  }

  // retrieve all of current user posts
  const retrieveUserPosts = async () => {
    try {
      const userPosts = await (await postCollection.where('user', '==', user.uid).limitToLast(10).orderBy('createdOn', 'desc').get()).docs.map(p => {
        let completePost = {
          postId: p.id,
          profile: profile || null,
          ...p.data(),
        }
        return completePost;
      });
      // console.log(userPosts);
      dispatch({ type: 'SET_POSTS', payload: userPosts });
    } catch (error) {
      console.log(error.message || error);
      setError(error.message || error);
    }
  }
  // if no user return context with no value
  if(!user){
    return (
      <Context.Provider value={{}}>
        {children}
      </Context.Provider>
    )
  }
  return (
    <Context.Provider value={{ ...state, addPost, retrieveUserPosts }}>
        {children}
    </Context.Provider>
  )
}

export default PostContext
