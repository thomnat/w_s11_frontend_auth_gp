const yup = require('yup')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const thisShouldBeSecret = 'shh'

let users = [
  {
    id: 1,
    username: 'tom',
    password: '$2a$04$XwS6RmJyjrXvfjwM6aIt8e/hUXtzTNlHIJvVjuPuFoNPbDZNnjL/2' // mypassword
  },
  {
    id: 2,
    username: 'liz',
    password: '$2a$04$cJ.bGJHDxc76DqCNt0capusTy4TwheygoiM7pwA4z1/3piI/0jrTm' // 12341234
  }
]

let id = 3

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('username is required')
    .min(3, 'username must be at least 3 characters long')
    .max(20, 'username must be at most 20 characters long'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long')
    .max(20, 'password must be at most 20 characters long'),
})

let invalidCredentials = [401, { message: `Invalid credentials` }]

async function login(user) {
  let validatedUser
  try {
    validatedUser = await userSchema.validate(user)
  } catch (err) {
    return [422, { message: err.message }]
  }
  try {
    const { username, password } = validatedUser
    const userDb = users.find(u => u.username === username)
    if (!userDb || !bcrypt.compareSync(password, userDb.password)) return invalidCredentials
    const claims = { id: userDb.id, username, role: 'student' }
    const token = jwt.sign(claims, thisShouldBeSecret, { expiresIn: '1h' })
    return [200, { message: `Welcome back, ${username}!`, token }]
  } catch (err) {
    return [500, { message: `Ouch: ${err.message}` }]
  }
}

async function register(user) {
  let validatedUser
  try {
    validatedUser = await userSchema.validate(user)
  } catch (err) {
    return [422, { message: `Ouch: ${err.message}` }]
  }
  try {
    const { username, password } = validatedUser
    const userDb = users.find(u => u.username === username)
    if (userDb) return [409, { message: `Sorry, user ${username} already exists` }]
    users.push({ id: id++, username, password: bcrypt.hashSync(password, 2) })
    return [201, { message: `Welcome, ${username}!` }]
  } catch (err) {
    return [500, { message: `Ouch: ${err.message}` }]
  }
}

async function verify(token) {
  try {
    await jwt.verify(token, thisShouldBeSecret)
    return [200, { message: 'Your token looks good' }]
  } catch (err) {
    return [401, { message: `Your token looks bad: ${err.message}` }]
  }
}

module.exports = {
  login,
  register,
  verify,
}
