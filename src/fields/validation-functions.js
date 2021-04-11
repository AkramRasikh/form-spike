export const checkEmail = email => {
  if (email === 'admin@zelt.com') {
    return 'That email already exists'
  }
  return true
}
