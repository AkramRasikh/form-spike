import {useState, useEffect} from 'react'

const useFormHandler = ({
  formStep,
  forms,
  setLoading,
  sidebarProgressSteps,
}) => {
  const [fieldStates, setFieldStates] = useState(forms)
  const [sidebarProgress, setSidebarProgress] = useState(sidebarProgressSteps)
  const [masterRequire, setMasterRequire] = useState(false)
  const [collectiveFormState, setCollectiveFormState] = useState({})

  const {
    firstName,
    email,
    lastName,
    startDate,
    department,
    role,
    salary,
  } = collectiveFormState
  const {personalInfoForm, employmentForm} = fieldStates

  const checkIfEmployee = () => {
    if (role === 'Employee') {
      setMasterRequire(true)
      setSidebarProgress(prev =>
        prev.map(sideStep => {
          if (sideStep.step === 'personalInfoForm') {
            return {...sideStep, status: 'success'}
          }
          if (sideStep.step === 'employmentForm') {
            return {...sideStep, nextStep: 'reviewAndSubmit'}
          }
          return sideStep
        }),
      )
    } else {
      setFieldStates({
        personalInfoForm,
        employmentForm,
      })
      setSidebarProgress(prev =>
        prev.map(sideStep => {
          if (sideStep.step === 'personalInfoForm') {
            return {...sideStep, status: 'success'}
          }
          if (sideStep.step === 'payrollForm') {
            return {...sideStep, status: 'n/a'}
          }
          return sideStep
        }),
      )
    }
    setLoading(false)
  }

  const createEmploymentFunc = () => {
    setSidebarProgress(prev =>
      prev.map(sideStep => {
        if (sideStep.step === 'employmentForm') {
          return {...sideStep, status: 'success'}
        }
        return sideStep
      }),
    )
    setLoading(false)
  }

  const createPayrollFunc = () => {
    setSidebarProgress(prev =>
      prev.map(sideStep => {
        if (sideStep.step === 'payrollForm') {
          return {...sideStep, status: 'success'}
        }
        return sideStep
      }),
    )
    setLoading(false)
  }

  useEffect(() => {
    if (firstName && email && lastName) {
      setLoading(true)
      checkIfEmployee()
    }
  }, [firstName, email, lastName])

  useEffect(() => {
    if (startDate && department) {
      setLoading(true)
      createEmploymentFunc()
    }
  }, [startDate, department])

  useEffect(() => {
    if (startDate && salary) {
      setLoading(true)
      createPayrollFunc()
    }
  }, [startDate, department])

  const submitAllDetails = () => {
    setLoading(true)
    setSidebarProgress(prev =>
      prev.map(sideStep => {
        if (sideStep.step === 'createAllDetails') {
          return {...sideStep, status: 'success'}
        }
        return sideStep
      }),
    )
    setLoading(false)
  }

  if (fieldStates[formStep]) {
    return {
      formState: {
        fields: fieldStates[formStep].fields,
        setFormValues: setCollectiveFormState,
        nextFormStep: fieldStates[formStep].nextFormStep,
        formSubmitText: fieldStates[formStep].formSubmitText,
        formValues: collectiveFormState,
      },
      masterRequire,
      sidebarProgress,
    }
  }
  return {
    details: collectiveFormState,
    sidebarProgress,
    submitAllDetails,
  }
}

export default useFormHandler
