import React from 'react'
import {object, string} from 'prop-types'

const TextInput = ({type, label, defaultValue, name, register, helperText}) => (
  <>
    <div>
      <label htmlFor={name}>{label}</label>
      {helperText && <span>- {helperText}</span>}
    </div>
    <input
      id={name}
      type={type}
      data-testid={name}
      {...register}
      defaultValue={defaultValue}
    />
  </>
)

TextInput.propTypes = {
  type: string.isRequired,
  label: string.isRequired,
  defaultValue: string,
  name: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  register: object.isRequired,
  helperText: string,
}

TextInput.defaultProps = {
  defaultValue: '',
  helperText: '',
}

export default TextInput
