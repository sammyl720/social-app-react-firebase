import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import Loader from '../../components/Loader';
const Signup = ({ history }) => {
  const { user, createUser, loading, error } = useUser();
  useEffect(() => {
    if(user){
      history.push('/profile');
    }
  }, [user])
  const [creds, setCreds] = useState({
    email: '',
    name: '',
    password: ''
  })

  const updateCredField = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createUser(creds)
  }
  const [visible, setVisible] = useState(false);
  if(loading) return <Loader />
  return (
    <div className='flex-fill'>
      {error && (
        <div className="alert alert-danger my-2">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card d-flex flex-column justify-content-center text-center p-3">
        <div className="card-body">
        <h1 className="card-title text-success mb-5">Signup</h1>
         <div className="input-group mb-2">
           <span className="input-group-text"><i className="fas fa-envelope"></i></span>
           <input type="email" name='email' value={creds.email} onChange={updateCredField} className="form-control" placeholder="john@example.com" required />
         </div>
         <div className="input-group mb-2">
           <span className="input-group-text"><i className="fas fa-user"></i></span>
           <input type="text" pattern="\w{4,}" name='name' value={creds.name} onChange={updateCredField} className="form-control" placeholder="Name" required />
         </div>
         <div className="input-group mb-2">
           <span className="input-group-text"><i className="fas fa-lock"></i></span>
           <input type={visible? "text" : "password"} className="form-control" pattern="\w{6,}" name='password' value={creds.password} onChange={updateCredField} placeholder="Password" required />
           <span className="input-group-text" onClick={() => setVisible(!visible)}><i className={`far ${visible ? 'fa-eye-slash' : 'fa-eye'}`}></i></span>
         </div>
         <div className="d-grid gap-4">
            <button type='submit' className="btn btn-secondary">Signup</button>
            <small className="text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </small>
         </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
