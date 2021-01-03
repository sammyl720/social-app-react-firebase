import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from './components/Layout/Navbar/Navbar';
import UserContext, { useUser } from './context/UserContext/UserContext';
import WelcomeScreen from './screens/public/WelcomeScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import Profile from './screens/auth/Profile';
import Login from './screens/public/Login';
import Signup from './screens/public/Signup';

function App() {
  const { updateUserState, loading, user } = useUser();
  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged((user) => {
      updateUserState(user);
    })
    return authSubscription;
  }, [])
  return (
      <Router>
        <Navbar />
        {loading ? <Loader /> :(
          <Switch>
            <Route path="/" exact component={WelcomeScreen} />
            <ProtectedRoute path="/profile" allowAccess={() => user != null} component={Profile}/>
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
      <App />
    </UserContext>
  )
}
export default AppWrapper;
