import React from 'react'
import classNames from 'classnames'
import {object, string} from 'prop-types'

const Sidebar = ({formStep, sidebarProcessSteps}) => (
  <div className="sidebar">
    {Object.keys(sidebarProcessSteps).map(key => {
      const {step, text, helperText, symbol} = sidebarProcessSteps[key]
      const btnClasses = classNames({
        'navigation-div-active': formStep === step,
        'navigation-div': true,
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
  // eslint-disable-next-line react/forbid-prop-types
  sidebarProcessSteps: object.isRequired,
}

export default Sidebar
