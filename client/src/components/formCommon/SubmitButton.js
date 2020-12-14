import React from 'react'

function SubmitButton ({ onClick }) {
  return (
    <button
      type='button'
      className='btn btn-danger'
      onClick={onClick}
    >
      <i className='fas fa-times' />
    </button>
  )
}

export default SubmitButton
