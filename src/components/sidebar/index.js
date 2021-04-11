import React from 'react'
import classNames from 'classnames'

const Sidebar = ({formStep, disabled, navigationButtons}) => (
  <div style={{width: '40%', borderRight: '1px solid'}}>
    {Object.keys(navigationButtons).map((key, index) => {
      const {step, disabledBtn, text, helperText} = navigationButtons[key]
      const btnClasses = classNames({
        'navigation-div': formStep === step && !disabled,
        'disabled-div': disabledBtn,
        'navigation-div-default': true,
      })

      return (
        <div key={index} className={btnClasses}>
          {text} <br />
          <span>{helperText}</span>
        </div>
      )
    })}
  </div>
)

export default Sidebar
