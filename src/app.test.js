// import '@testing-library/jest-dom/extend-expect'
// import '@testing-library/jest-dom'
import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import App from './app'
import {createUser, createEmployment, createPayroll} from './api-client'

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

test('(Happy path) Employee should be able to fill form', async () => {
  createUser.mockImplementation(() => userId)
  const {
    getByTestId,
    getByText,
    getAllByText,
    getByRole,
    getByLabelText,
  } = render(<App />)

  const emailLabel = getByLabelText('Email')
  const firstNameLabel = getByLabelText('First Name')
  const lastNameLabel = getByLabelText('Last Name')
  const roleLabel = getByTestId('role')

  await checkCreateUserFormWarnings(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
  )

  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  expect(getByText('Entered value does not match email format')).toBeDefined()
  expect(getAllByText('Must be at least 3 letters').length).toBe(2)

  await checkCreateUserDuplicateEmail(emailLabel)
  expect(getByText('Cannot be that email maite')).toBeDefined()

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

  // Employment
  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  const startDateLabel = getByLabelText('Start date')
  const departmentSelect = getByTestId('department')

  await checkCreateEmployeeFormWarnings(startDateLabel)
  expect(getByText('Enter a blood clart date')).toBeDefined()
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

  // payroll form
  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  const salaryLabel = getByLabelText('Salary')
  await checkCreatePayrollFormWarnings(salaryLabel)
  expect(getByText('Entered value does not match salary')).toBeDefined()
  await viableCreatePayrollForm(salaryLabel)
  expect(getByText('- Only needed for "Employees"')).toBeDefined()
  expect(getByRole('button').hasAttribute('disabled')).toBeFalsy()

  await act(async () => {
    fireEvent.submit(getByTestId('form'))
  })

  expect(createPayroll).toHaveBeenCalledWith({
    startDate: '11/11/2020',
    salary: '60000.00',
    userId,
  })

  expect(getByText('legit@email.com')).toBeDefined()
})
test('(Happy path) Contractor (non-employee) should be able to fill form', async () => {
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

  await checkCreateUserFormWarnings(
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    roleLabel,
    getAllByText,
  )

  expect(getByRole('button').hasAttribute('disabled')).toBeTruthy()
  expect(getByText('Entered value does not match email format')).toBeDefined()
  expect(getAllByText('Must be at least 3 letters').length).toBe(2)

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
  expect(getByText('Enter a blood clart date')).toBeDefined()
  await viableCreateEmployeeForm(startDateLabel, departmentSelect)

  await act(async () => {
    fireEvent.submit(getByTestId('form'))
  })

  expect(createEmployment).toHaveBeenCalledWith({
    startDate: '11/11/2020',
    department: 'Sales',
    userId,
  })

  expect(queryByText('- Only needed for "Employees"')).toBeNull()

  expect(getByText('Contractor')).toBeDefined()
  expect(getByText('legit@email.com')).toBeDefined()
  expect(getByText('Akram')).toBeDefined()
  expect(getByText('11/11/2020')).toBeDefined()
  expect(getByText('Sales')).toBeDefined()
})
