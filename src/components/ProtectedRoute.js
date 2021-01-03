import React from 'react'
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoute = ({ component: Component, allowAccess, ...rest }) => {
  // set a guard
  // for demonstration access is granted on the flip of a coing
  const open = allowAccess();
  return open ? <Route {...rest} component={Component} /> : <Redirect to='/' />;
}

export default ProtectedRoute
