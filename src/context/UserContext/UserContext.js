import React, { useContext, createContext, useReducer } from 'react'
import { auth, db } from '../../firebase';
import firebase from 'firebase'
import userReducer from './userReducer';

// database reference
const userCollection = db.collection('users');
// context
const Context = createContext();
const useUser = () => useContext(Context);
// provider
const UserContext = ({ children }) => {
  const initialState = {
    user:null,
    profile: null,
    profile_reference: null,
    error: null,
    loading: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  // dispatch actions
  const setLoading = (loadingState) => {
    dispatch({ type: 'SET_LOADING', payload: loadingState});
  }

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error})
    setTimeout(() => {
      dispatch({ type: 'SET_ERROR', payload: null })
    }, 5000)
  }

  // add a user post
  const addUserPost = async (postPath) => {
    try {
      const userPostsRef = await db.doc(state.profile_reference);
      const newPost = await userPostsRef.set({
        posts: firebase.firestore.FieldValue.arrayUnion(postPath)
      }, { merge: true })
      console.log(postPath);
    } catch (error) {
      setError(error.message || error)
    }
  }
  // signout user
  const logout = () => {
    auth.signOut();
  }

  // sign up a new user
  const createUser = async ({email, password, name}) => {
    setLoading(true);
    setError(null);
    try {
      if(!name) {
        throw new Error('Name is required');
      }
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const profileRef = setUserProfileDbRef(user.uid);
      await db.doc(profileRef).set({
        name,
        username: name.replace(/[\W ]/gi, ''),
        uid: user.uid,
        posts: [],
        following: [],
        followers: []
      })
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
  }

  // update a user in context
  const updateUserState = user => {
    setLoading(true);
    if(user){
      dispatch({ type: 'SET_USER', payload: user });
      setUserProfileDbRef(user.uid);
    } else {
      dispatch({ type: 'RESET' });
    }
    setLoading(false);
  }

  // get a user db profile reference
  const setUserProfileDbRef = (uid) => {
    const profileRef = userCollection.doc(uid).path;
    dispatch({ type: 'SET_PROFILE_REF', payload: profileRef});
    return profileRef;
  }

  // login a user
  const loginUser = async ({email, password}) => {
    setLoading(true);
    setError(null);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
  }

  const retrieveUserProfile = async () => {
    try {
      let ref = db.doc(state.profile_reference);
      const doc = await ref.get();
      const profile = doc.data();
      dispatch({ type: 'SET_PROFILE', payload: profile });
    } catch (error) {
      setError(error.message || error);
    }
  }
  return (
    <Context.Provider value={{ ...state, setError, setLoading, loginUser, createUser, updateUserState, logout, retrieveUserProfile, addUserPost }}>
      {children}
    </Context.Provider>
  )
}

export { useUser };
export default UserContext
