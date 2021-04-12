import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import App from './app'
import {createUser, createEmployment, createPayroll} from './api-client'
import fields from './fields'

const {
  forms: {personalInfoForm, employmentForm, payrollForm},
} = fields

const emailError = personalInfoForm.fields[1].pattern.message
const firstNameMinErr = personalInfoForm.fields[2].rules.minLength.message
const salaryError = payrollForm.fields[0].pattern.message
const startDateError = employmentForm.fields[0].pattern.message
const salaryHelperText = payrollForm.fields[0].helperText
const processHeader = 'Onboarding new user'
const successHeader = 'You are fully onboarded 😃'

jest.mock('./api-client')

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})
const userId = 1

const checkCreateUserFormWarnings = async (
  emailLabel,
  firstNameLabel,
  lastNameLabel,
) => {
  await act(async () => {
    fireEvent.change(emailLabel, {target: {value: 'broken@email'}})
    fireEvent.change(firstNameLabel, {target: {value: 'aa'}})
    fireEvent.change(lastNameLabel, {target: {value: 'bb'}})
  })
}

const checkCreateUserDuplicateEmail = async emailLabel => {
  await act(async () => {
    fireEvent.change(emailLabel, {target: {value: 'admin@zelt.com'}})
  })
}
const viableCreateUserFormContractor = async (
  emailLabel,
  firstNameLabel,
  lastNameLabel,
  roleLabel,
  formId,
) => {
  await act(async () => {
    fireEvent.change(roleLabel, {target: {value: 'Contractor'}})
    fireEvent.change(emailLabel, {target: {value: 'legit@email.com'}})
    fireEvent.change(firstNameLabel, {target: {value: 'Akram'}})
    fireEvent.change(lastNameLabel, {target: {value: 'Rasikh'}})
    fireEvent.submit(formId)
  })
}
const viableCreateUserForm = async (
  emailLabel,
  firstNameLabel,
  lastNameLabel,
  roleLabel,
  formId,
) => {
  await act(async () => {
    fireEvent.change(roleLabel, {target: {value: 'Employee'}})
    fireEvent.change(emailLabel, {target: {value: 'legit@email.com'}})
    fireEvent.change(firstNameLabel, {target: {value: 'Akram'}})
    fireEvent.change(lastNameLabel, {target: {value: 'Rasikh'}})
    fireEvent.submit(formId)
  })
}

const checkCreateEmployeeFormWarnings = async startDateLabel => {
  await act(async () => {
    fireEvent.change(startDateLabel, {target: {value: '110'}})
  })
}
const viableCreateEmployeeForm = async (startDateLabel, departmentSelect) => {
  await act(async () => {
    fireEvent.change(startDateLabel, {target: {value: '11/11/2020'}})
    fireEvent.change(departmentSelect, {target: {value: 'Sales'}})
  })
}

const checkCreatePayrollFormWarnings = async salaryLabel => {
  await act(async () => {
    fireEvent.change(salaryLabel, {target: {value: '-1111'}})
  })
}
const viableCreatePayrollForm = async salaryLabel => {
  await act(async () => {
    fireEvent.change(salaryLabel, {target: {value: '60000.00'}})
  })
}

test('Employee should be able to complete form', async () => {
  createUser.mockImplementation(() => userId)
  const {
    getByTestId,
    getByText,
    getAllByText,
    getByRole,
    getByLabelText,
    queryByText,
  } = render(<App />)

  const emailLabel = getByLabelText('Email')
  const firstNameLabel = getByLabelText('First Name')
  const lastNameLabel = getByLabelText('Last Name')
  const roleLabel = getByTestId('role')

  expect(queryByText('✓')).toBeNull()
  expect(queryByText('✘')).toBeNull()

  expect(getByText(processHeader)).toBeDefined()
  expect(queryByText(successHeader)).toBeNull()

  await checkCreateUserFormWarnings(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
  )

  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  expect(getByText(emailError)).toBeDefined()
  expect(getAllByText(firstNameMinErr).length).toBe(2)

  await checkCreateUserDuplicateEmail(emailLabel)
  expect(getByText('That email already exists')).toBeDefined()

  await viableCreateUserForm(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
    getByTestId('form'),
  )

  expect(createUser).toHaveBeenCalledWith({
    email: 'legit@email.com',
    firstName: 'Akram',
    lastName: 'Rasikh',
  })
  expect(getByText('✓')).toBeDefined()
  // Employment
  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  const startDateLabel = getByLabelText('Start date')
  const departmentSelect = getByTestId('department')

  await checkCreateEmployeeFormWarnings(startDateLabel)
  expect(getByText(startDateError)).toBeDefined()
  await viableCreateEmployeeForm(startDateLabel, departmentSelect)
  expect(getByRole('button').hasAttribute('disabled')).toBeFalsy()

  await act(async () => {
    fireEvent.submit(getByTestId('form'))
  })

  expect(createEmployment).toHaveBeenCalledWith({
    startDate: '11/11/2020',
    department: 'Sales',
    userId,
  })

  expect(getAllByText('✓').length).toBe(2)

  // payroll form
  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  const salaryLabel = getByLabelText('Salary GBP')
  await checkCreatePayrollFormWarnings(salaryLabel)
  expect(getByText(salaryError)).toBeDefined()
  await viableCreatePayrollForm(salaryLabel)
  expect(getByText(`- ${salaryHelperText}`)).toBeDefined()
  expect(getByRole('button').hasAttribute('disabled')).toBeFalsy()

  await act(async () => {
    fireEvent.submit(getByTestId('form'))
  })

  expect(createPayroll).toHaveBeenCalledWith({
    startDate: '11/11/2020',
    salary: '60000.00',
    userId,
  })

  expect(getAllByText('✓').length).toBe(3)
  expect(getByText('Employee')).toBeDefined()
  expect(getByText('legit@email.com')).toBeDefined()
  expect(getByText('11/11/2020')).toBeDefined()
  expect(getByText('Sales')).toBeDefined()
  expect(getByText('Akram')).toBeDefined()
  expect(getByText('Rasikh')).toBeDefined()
  expect(getByText(successHeader)).toBeDefined()
  expect(queryByText(processHeader)).toBeNull()
})
test('Contractor (non-employee) should be able to complete form', async () => {
  createUser.mockImplementation(() => userId)
  const {
    getByTestId,
    getByText,
    getAllByText,
    getByRole,
    getByLabelText,
    queryByText,
  } = render(<App />)

  const emailLabel = getByLabelText('Email')
  const firstNameLabel = getByLabelText('First Name')
  const lastNameLabel = getByLabelText('Last Name')
  const roleLabel = getByTestId('role')

  expect(queryByText('✓')).toBeNull()
  expect(queryByText('✘')).toBeNull()
  expect(getByText(processHeader)).toBeDefined()
  expect(queryByText(successHeader)).toBeNull()

  await checkCreateUserFormWarnings(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
    getAllByText,
  )

  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  expect(getByText(emailError)).toBeDefined()
  expect(getAllByText(firstNameMinErr).length).toBe(2)

  await viableCreateUserFormContractor(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
    getByTestId('form'),
  )

  expect(createUser).toHaveBeenCalledWith({
    email: 'legit@email.com',
    firstName: 'Akram',
    lastName: 'Rasikh',
  })

  expect(getByText('✓')).toBeDefined()

  // Employment
  expect(getByText('submit')).toBeDefined()
  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()

  const startDateLabel = getByLabelText('Start date')
  const departmentSelect = getByTestId('department')

  await act(async () => {
    fireEvent.change(departmentSelect, {target: {value: 'Sales'}})
  })

  // Start date not required
  expect(getByRole('button').hasAttribute('disabled')).toBeFalsy()
  await checkCreateEmployeeFormWarnings(startDateLabel)
  expect(getByText(startDateError)).toBeDefined()
  await viableCreateEmployeeForm(startDateLabel, departmentSelect)

  await act(async () => {
    fireEvent.submit(getByTestId('form'))
  })

  expect(createEmployment).toHaveBeenCalledWith({
    startDate: '11/11/2020',
    department: 'Sales',
    userId,
  })

  expect(queryByText(`- ${salaryHelperText}`)).toBeNull()

  expect(getByText('Contractor')).toBeDefined()
  expect(getByText('legit@email.com')).toBeDefined()
  expect(getByText('11/11/2020')).toBeDefined()
  expect(getByText('Sales')).toBeDefined()
  expect(getByText('Akram')).toBeDefined()
  expect(getByText('Rasikh')).toBeDefined()
  expect(getAllByText('✓').length).toBe(2)
  expect(getByText('✘')).toBeDefined()
})
