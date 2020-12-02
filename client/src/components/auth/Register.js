import React, { Fragment, useState } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {setAlert} from '../../redux/action/alert'
import {register} from '../../redux/action/auth'

function Register() {
  const dispatch = useDispatch();
  const [formData,setFromData]=useState(
  {
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name ,email ,password,password2} = formData;
  const onChange = ({target: {name, value}}) => setFromData({...formData,[name]: value});
  const onSubmit = async e =>
  {
    e.preventDefault();
    if(password !== password2)
    {
        dispatch(setAlert('password do not match','danger'));
    }
    else
    {
       dispatch(register({name,email,password}));
    }
    }
  return (
    <Fragment>
      <h1 className = "large text-primary">Sign Up</h1>
      <p className = "lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className = "form" onSubmit = {e => onSubmit(e)}>
      <div className = "form-group">
        <input 
        value = {name}
        onChange = {e => onChange(e)}
        type = "text" 
        placeholder = "Name" 
        name = "name" 
        required />
      </div>
      <div className = "form-group">
        <input type = "text"
        placeholder = "Email Address" 
        value = {email}
        required
        onChange = {e => onChange(e)}
        name = "email" />
      </div>
      <div className = "form-group">
        <input
          type = "password"
          placeholder = "Password"
          name = "password"
          minLength = "6"
          required
          value = {password}
          onChange = {e => onChange(e)}
       />
      </div>
      <div className = "form-group">
        <input
                type = "password"
                placeholder = "Confirm Password"
                value = {password2}
                required
                onChange = {e => onChange(e)}
                name = "password2"
                minLength = "6"
            />
          </div>
        <input 
          type = "submit" 
          className = "btn btn-primary" 
          value = "Register" 
        />
      </form>
      <p className = "my-1">
        Already have an account? <Link to = '/login'>Sign In</Link>
      </p>
    </Fragment>
  )
}

export default Register
