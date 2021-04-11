const delay = milli => new Promise(resolve => setTimeout(resolve, milli))

// Returns a new userId
export const createUser = async ({firstName, lastName, email}) => {
  console.log('firstName, lastName, email: ', firstName, lastName, email)
  await delay(500)
  if (email === 'admin@zelt.com') throw new Error('EMAIL_EXISTS')
  return 1
}
export const createEmployment = async ({userId, startDate, department}) => {
  console.log('userId, startDate, department: ', userId, startDate, department)
  await delay(500)
  return true
}
export const createPayroll = async ({userId, startDate, salary}) => {
  console.log('userId, startDate, salary: ', userId, startDate, salary)
  await delay(500)
  return true
}
