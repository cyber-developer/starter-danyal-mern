import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addExperience } from 'redux/action/profileAction'
import { Link } from 'react-router-dom'
import InputForm from 'components/formCommon/InputForm'

function AddExperience ({ history }) {
  const [formData, setformData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const dispatch = useDispatch()

  const { company, title, location, from, to, current, description } = formData

  const onChange = e => setformData({ ...formData, [e.target.name]: e.target.value })

  return (
    <>
      <h1 className='large text-primary'>
        Add An Experience
      </h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className='form' onSubmit={(e) => {
          e.preventDefault()
          dispatch(addExperience(formData, history))
        }}
      >

        <InputForm type='text' placeholder='* Job Title' name='title' value={title} onChange={(e) => onChange(e)} required />
        <InputForm type='text' placeholder='* Company' name='company' required value={company} onChange={(e) => onChange(e)} required />
        <InputForm type='text' placeholder='Location' name='location' value={location} onChange={(e) => onChange(e)} />

        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <p><input
            type='checkbox' name='current' checked={current} value={current} onChange={(e) => {
              setformData({ ...formData, current: !current })
              toggleDisabled(!toDateDisabled)
            }}
             />{' '} Current Job
          </p>
        </div>

        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description} onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>Go Back</Link>
      </form>
    </>
  )
}

export default AddExperience
