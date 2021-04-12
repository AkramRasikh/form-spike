import personalInfoForm from './personal-info-fields'
import employmentForm from './employment-fields'
import payrollForm from './payroll-fields'

export default {
  forms: {
    personalInfoForm,
    employmentForm,
    payrollForm,
  },
  sidebarProgressSteps: [
    {
      id: 1,
      text: '1. Personal info',
      step: 'personalInfoForm',
      helperText: '',
      nextStep: 'employmentForm',
    },
    {
      id: 2,
      text: '2. Employment',
      step: 'employmentForm',
      helperText: '',
      nextStep: 'payrollForm',
    },
    {
      id: 3,
      text: '3. Payroll',
      step: 'payrollForm',
      helperText: 'For "Employees"',
      nextStep: 'reviewAndSubmit',
    },
    {
      id: 4,
      text: '4. Review details & Submit',
      step: 'createAllDetails',
    },
  ],
  formKey: {
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    role: 'Role',
    department: 'Department',
    startDate: 'Start Date',
    salary: 'Salary GBP',
  },
}
