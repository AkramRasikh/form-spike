import {bool, string} from 'prop-types'
import React from 'react'

const FormButton = ({disabled, children}) => (
  <div style={{textAlign: 'right'}}>
    <button type="submit" disabled={disabled}>
      {children}
    </button>
  </div>
)

FormButton.propTypes = {
  disabled: bool.isRequired,
  children: string.isRequired,
}

export default FormButton
