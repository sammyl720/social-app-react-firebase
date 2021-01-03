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
    default: return state;
  }
}


// provider
const PostContext = ({ children }) => {
  const { user, addUserPost, setError, setLoading } = useUser();
  const initialState = {
    posts: [],
  }

  const [state, dispatch] = useReducer(postReducer, initialState);
  
  const addPost = async (post) => {
    setLoading(true);
    try {
      const postPath = await postCollection.doc();
      const fullPost = {
        post,
        user: user.uid,
        createdOn: Date.now(),
        likes: 0
      }
      await postPath.set(fullPost);
      dispatch({ type: 'ADD_POST', payload: fullPost })
      addUserPost(postPath.path);
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
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
    <Context.Provider value={{ ...state, addPost }}>
        {children}
    </Context.Provider>
  )
}

export default PostContext
