/* eslint-disable react/forbid-prop-types */
import React from 'react'
import {array, object, string} from 'prop-types'

const SelectInput = ({
  label,
  name,
  options,
  defaultValue,
  helperText,
  register,
}) => (
  <>
    <div>
      <label htmlFor={name}>{label}</label>
      {helperText && <span>- {helperText}</span>}
    </div>
    <select defaultValue={defaultValue} {...register} data-testid={name}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </>
)

SelectInput.propTypes = {
  type: string.isRequired,
  label: string.isRequired,
  defaultValue: string,
  name: string.isRequired,
  register: object.isRequired,
  options: array.isRequired,
  helperText: string,
}

SelectInput.defaultProps = {
  defaultValue: '',
  helperText: '',
}

export default SelectInput
