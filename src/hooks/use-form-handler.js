import {useState, useEffect} from 'react'
import {createUser, createEmployment, createPayroll} from '../api-client'

const useFormHandler = ({
  formStep,
  forms,
  setLoading,
  sidebarProgressSteps,
}) => {
  const [fieldStates, setFieldStates] = useState(forms)
  const [sidebarProgress, setSidebarProgress] = useState(sidebarProgressSteps)
  const [formSubmissionText, setFormSubmissionText] = useState('Next')
  const [masterRequire, setMasterRequire] = useState(false)
  const [employeeCreated, setEmployeeCreated] = useState(false)
  const [collectiveFormState, setCollectiveFormState] = useState({})
  const [userId, setUserId] = useState('')

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
      setFormSubmissionText('submit')
    }
  }

  const createUserFunc = async () => {
    try {
      const id = await createUser({firstName, email, lastName})
      setUserId(id)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    checkIfEmployee(role)
  }

  const createEmploymentFunc = async () => {
    try {
      await createEmployment({startDate, department, userId})
      setFormSubmissionText('Submit')
      setLoading(false)
      setEmployeeCreated(true)
      setSidebarProgress(prev =>
        prev.map(sideStep => {
          if (sideStep.step === 'employmentForm') {
            return {...sideStep, status: 'success'}
          }
          return sideStep
        }),
      )
    } catch (error) {
      setLoading(false)
    }
  }

  const createPayrollFunc = async () => {
    try {
      await createPayroll({userId, startDate, salary})
      setSidebarProgress(prev =>
        prev.map(sideStep => {
          if (sideStep.step === 'payrollForm') {
            return {...sideStep, status: 'success'}
          }
          return sideStep
        }),
      )
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(async () => {
    if (firstName && email && lastName && !userId) {
      setLoading(true)
      createUserFunc()
    } else if (startDate && department && userId && !employeeCreated) {
      setLoading(true)
      createEmploymentFunc()
    } else if (startDate && salary && employeeCreated) {
      setLoading(true)
      createPayrollFunc()
    }
  }, [collectiveFormState])

  if (fieldStates[formStep]) {
    return {
      formState: {
        fields: fieldStates[formStep].fields,
        setFormValues: setCollectiveFormState,
        nextFormStep: fieldStates[formStep].nextFormStep,
      },
      formSubmissionText,
      masterRequire,
      sidebarProgress,
    }
  }
  return {
    details: collectiveFormState,
    sidebarProgress,
  }
}

export default useFormHandler
