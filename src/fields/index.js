import personalInfoForm from './personal-info-fields'
import employmentForm from './employment-fields'
import payrollForm from './payroll-fields'

export default {
  forms: {
    personalInfoForm,
    employmentForm,
    payrollForm,
  },
  sidebarProcess: {
    personalInfoSidebar: {
      text: '1. Personal info',
      step: 'personalInfoForm',
      helperText: '',
    },
    employmentSidebar: {
      text: '2. Employment',
      step: 'employmentForm',
      helperText: '',
    },
    payrollSidebar: {
      text: '3. Payroll',
      step: 'payrollForm',
      helperText: 'For "Employees"',
    },
  },
  formKey: {
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    role: 'Role',
    department: 'Department',
    startDate: 'Start Date',
    salary: 'Salary',
  },
}
