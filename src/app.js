import React, {useState} from 'react'
import classNames from 'classnames'
import {Form, Sidebar, CompletedDetails, Navbar, Footer} from './components'
import fields from './fields'

import './styles.css'
import useFormHandler from './hooks/use-form-handler'

function App() {
  const [formStep, setFormStep] = useState('personalInfoForm')
  const [isLoading, setLoading] = useState(false)
  const {forms, sidebarProgressSteps, formKey} = fields
  const {
    formState,
    details,
    formSubmissionText,
    masterRequire,
    sidebarProgress,
  } = useFormHandler({
    formStep,
    forms,
    setLoading,
    sidebarProgressSteps,
  })
  const containerClasses = classNames({
    'app-container': true,
    'loading-class': isLoading,
  })

  const heading = formState
    ? 'Onboarding new user'
    : 'You are fully onboarded 😃'
  return (
    <div className={containerClasses}>
      <Navbar />
      <div className="page-container">
        <Sidebar formStep={formStep} sidebarProgress={sidebarProgress} />
        <div className="form-container">
          <h1>{heading}</h1>
          {formState ? (
            <Form
              setFormStep={setFormStep}
              formSubmissionText={formSubmissionText}
              masterRequire={masterRequire}
              {...formState}
            />
          ) : (
            <CompletedDetails details={details} formKey={formKey} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
