import React from 'react'
import classNames from 'classnames'
import {arrayOf, object, string} from 'prop-types'
import Symbol from './symbol'

const Sidebar = ({formStep, sidebarProgress}) => (
  <div className="sidebar">
    {sidebarProgress.map(sideStep => {
      const {step, text, helperText, status, id} = sideStep
      const sidebarStepsClasses = classNames({
        'navigation-div-active': formStep === step && status !== 'n/a',
        'navigation-div-psuedo-disabled': status === 'n/a',
        'navigation-div': true,
      })

      return (
        <div key={id} className={sidebarStepsClasses}>
          {text} {status && <Symbol status={status} />} <br />
          <span>{helperText}</span>
        </div>
      )
    })}
  </div>
)

Sidebar.propTypes = {
  formStep: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sidebarProgress: arrayOf(object).isRequired,
}

export default Sidebar
