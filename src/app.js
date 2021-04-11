import React, {useState} from 'react'
import classNames from 'classnames'
import {Form, Sidebar, CompletedDetails, Navbar, Footer} from './components'
import fields from './fields'

import './styles.css'
import useFormHandler from './hooks/use-form-handler'

function App() {
  const [formStep, setFormStep] = useState('personalInfoForm')
  const [isLoading, setLoading] = useState(false)
  const {forms, sidebarProcessSteps, formKey} = fields
  const {
    formState,
    details,
    formSubmissionText,
    masterRequire,
  } = useFormHandler({
    formStep,
    forms,
    setLoading,
  })
  const containerClasses = classNames({
    'app-container': true,
    'loading-class': isLoading,
  })

  return (
    <div className={containerClasses}>
      <Navbar />
      <div className="page-container">
        <Sidebar
          formStep={formStep}
          setFormStep={setFormStep}
          sidebarProcessSteps={sidebarProcessSteps}
          disabled={!formState}
        />
        <div className="form-container">
          <h1>Onboarding new user</h1>
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
