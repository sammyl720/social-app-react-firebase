import React, { useContext, createContext, useReducer } from 'react'
import { auth, db } from '../../firebase';
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
    name: 'Joe'
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  // dispatch actions
  const setLoading = (loadingState) => {
    dispatch({ type: 'SET_LOADING', payload: loadingState});
  }

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error})
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
      await profileRef.set({
        name,
        uid: user.uid
      })
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
  }

  // update a user in context
  const updateUserState = user => {
    setLoading(true);
    dispatch({ type: 'SET_USER', payload: user });
    setLoading(false);
  }

  // get a user db profile reference
  const setUserProfileDbRef = uid => {
    const profileRef = userCollection.doc(uid);
    dispatch({ type: 'SET_PROFILE_REF', payload: profileRef});
    return profileRef;
  }

  // login a user
  const loginUser = async ({email, password}) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      // create profile reference to write data
      setUserProfileDbRef(user.uid);
    } catch (error) {
      setError(error.message || error);
    }
    setLoading(false);
  }
  return (
    <Context.Provider value={{ ...state, setError, setLoading, loginUser, createUser, updateUserState, logout }}>
      {children}
    </Context.Provider>
  )
}

export { useUser };
export default UserContext
