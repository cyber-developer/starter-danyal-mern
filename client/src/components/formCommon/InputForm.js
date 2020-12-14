import React from 'react'

function InputForm ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  required = false
}) {
  return (
    <div className='form-group'>
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} required={required} />
    </div>
  )
}

export default InputForm
