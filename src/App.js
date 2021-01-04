import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from './components/Layout/Navbar/Navbar';
import UserContext, { useUser } from './context/UserContext/UserContext';
import PostContext from './context/PostContext/PostContext'
import WelcomeScreen from './screens/public/WelcomeScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import Profile from './screens/auth/Profile';
import Login from './screens/public/Login';
import Signup from './screens/public/Signup';
import Feed from './screens/auth/Feed';

function App() {
  const { updateUserState, loading, user, profile, profile_reference, retrieveUserProfile } = useUser();
  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged((user) => {
      updateUserState(user);
    })
    return authSubscription;
  }, [])
  useEffect(() => {
  if((user && profile_reference) && !profile){
    retrieveUserProfile()
    }
  }, [profile, user, profile_reference])
  return (
      <Router>
        <Navbar />
        {loading ? <Loader /> :(
          <Switch>
            <Route path="/" exact component={WelcomeScreen} />
            <ProtectedRoute path="/profile" allowAccess={() => user != null} component={Profile}/>
            <ProtectedRoute path="/feed" allowAccess={() => user != null} component={Feed}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </Router>
  );
}

const AppWrapper = () => {
  return (
    <UserContext>
      <PostContext>
        <App />
      </PostContext>
    </UserContext>
  )
}
export default AppWrapper;
