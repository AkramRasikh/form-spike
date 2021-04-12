import React from 'react'
import classNames from 'classnames'
import {arrayOf, func, object, string} from 'prop-types'
import Symbol from './symbol'

const Sidebar = ({formStep, sidebarProgress, setFormStep}) => (
  <div className="sidebar">
    {sidebarProgress.map(sideStep => {
      const {step, text, helperText, status, id} = sideStep
      const sidebarStepsClasses = classNames({
        'navigation-div-active': formStep === step && status !== 'n/a',
        'navigation-div-psuedo-disabled': status === 'n/a',
        'navigation-div': true,
      })

      return (
        <button
          type="button"
          key={id}
          className={sidebarStepsClasses}
          onClick={() => setFormStep(step)}
        >
          {text} {status && <Symbol status={status} />} <br />
          <span>{helperText}</span>
        </button>
      )
    })}
  </div>
)

Sidebar.propTypes = {
  formStep: string.isRequired,
  setFormStep: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sidebarProgress: arrayOf(object).isRequired,
}

export default Sidebar
