import React from 'react'
import {string} from 'prop-types'

const InputError = ({errorMessage}) => (
  <span role="alert" className="alert">
    {errorMessage}
  </span>
)

InputError.propTypes = {
  errorMessage: string.isRequired,
}

export default InputError
