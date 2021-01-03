import React from 'react'
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // set a guard
  // for demonstration access is granted on the flip of a coing
  const open = (Math.random() * 2) > 1;
  console.log(open);
  return open ? <Route {...rest} component={Component} /> : <Redirect to='/' />;
}

export default ProtectedRoute
