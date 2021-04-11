import React, {useState} from 'react'
import Form from './components/form'
import fields from './fields'
import Sidebar from './components/sidebar'

import './styles.css'
import useFormHandlerHook from './hooks/use-form-handler-hook'
import CompletedDetails from './components/completed-details'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  const [formStep, setFormStep] = useState('personalInfoForm')
  const [isLoading, setLoading] = useState(false)
  const {forms, sidebarProcess, formKey} = fields
  const {
    formState,
    details,
    formSubmissionText,
    masterRequire,
  } = useFormHandlerHook({
    formStep,
    forms,
    setLoading,
  })

  return (
    <div style={{height: '100vh'}} className={isLoading ? 'loading-class' : ''}>
      <Navbar />
      <div style={{display: 'flex', height: '100%'}}>
        <Sidebar
          formStep={formStep}
          setFormStep={setFormStep}
          navigationButtons={sidebarProcess}
          disabled={!formState}
        />
        <div style={{width: '100%', padding: '30px'}}>
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
