import {useState, useEffect} from 'react'
import {createUser, createEmployment, createPayroll} from '../api-client'

const useFormHandlerHook = ({formStep, forms, setLoading, sidebarProcess}) => {
  const [fieldStates, setFieldStates] = useState(forms)
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
    } else {
      setFieldStates({
        personalInfoForm,
        employmentForm,
      })
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
      setFormSubmissionText('submit')
      setLoading(false)
      setEmployeeCreated(true)
    } catch (error) {
      setLoading(false)
    }
  }

  const createPayrollFunc = async () => {
    try {
      await createPayroll({userId, startDate, salary})
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
    }
  }
  return {
    details: collectiveFormState,
  }
}

export default useFormHandlerHook
