import React from 'react'
import classNames from 'classnames'
import {object, string} from 'prop-types'

const Sidebar = ({formStep, navigationButtons}) => (
  <div style={{width: '40%', borderRight: '1px solid'}}>
    {Object.keys(navigationButtons).map(key => {
      const {step, disabledBtn, text, helperText, symbol} = navigationButtons[
        key
      ]
      const btnClasses = classNames({
        'navigation-div': formStep === step,
        'disabled-div': disabledBtn,
        'navigation-div-default': true,
      })

      return (
        <div key={text[0]} className={btnClasses}>
          {text} <span>{symbol}</span> <br />
          <span>{helperText}</span>
        </div>
      )
    })}
  </div>
)

Sidebar.propTypes = {
  formStep: string.isRequired,
  // disabled: string.isRequired,
  navigationButtons: object.isRequired,
}

Sidebar.defaultProps = {
  defaultValue: '',
  helperText: '',
}

export default Sidebar
