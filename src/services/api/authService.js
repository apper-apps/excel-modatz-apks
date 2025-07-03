import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import users from '@/services/mockData/users'

const JWT_SECRET = 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '24h'

let userData = [...users]
let nextId = Math.max(...userData.map(u => u.Id)) + 1

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      Id: user.Id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Login user
const login = async (credentials) => {
  await delay(300)
  
  const { username, password } = credentials
  
  if (!username || !password) {
    throw new Error('Username and password are required')
  }
  
  // Find user by username or email
  const user = userData.find(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    u.email.toLowerCase() === username.toLowerCase()
  )
  
  if (!user) {
    throw new Error('Invalid credentials')
  }
  
  // Verify password
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }
  
  // Generate token
  const token = generateToken(user)
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = user
  
  return {
    user: userWithoutPassword,
    token
  }
}

// Register new user
const register = async (userData) => {
  await delay(400)
  
  const { username, email, password, firstName, lastName } = userData
  
  if (!username || !email || !password || !firstName || !lastName) {
    throw new Error('All fields are required')
  }
  
  // Check if user already exists
  const existingUser = userData.find(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    u.email.toLowerCase() === email.toLowerCase()
  )
  
  if (existingUser) {
    throw new Error('User already exists')
  }
  
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10)
  
  // Create new user
  const newUser = {
    Id: nextId++,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName,
    lastName,
    role: 'user',
    avatar: null,
    bio: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  userData.push(newUser)
  
  // Generate token
  const token = generateToken(newUser)
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = newUser
  
  return {
    user: userWithoutPassword,
    token
  }
}

// Refresh token
const refreshToken = async (token) => {
  await delay(200)
  
  try {
    const decoded = verifyToken(token)
    const user = userData.find(u => u.Id === decoded.Id)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    const newToken = generateToken(user)
    const { password: _, ...userWithoutPassword } = user
    
    return {
      user: userWithoutPassword,
      token: newToken
    }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Get current user
const getCurrentUser = async (token) => {
  await delay(200)
  
  try {
    const decoded = verifyToken(token)
    const user = userData.find(u => u.Id === decoded.Id)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Change password
const changePassword = async (token, passwords) => {
  await delay(300)
  
  const { currentPassword, newPassword } = passwords
  
  if (!currentPassword || !newPassword) {
    throw new Error('Current and new passwords are required')
  }
  
  try {
    const decoded = verifyToken(token)
    const user = userData.find(u => u.Id === decoded.Id)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    // Verify current password
    const isCurrentPasswordValid = bcrypt.compareSync(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect')
    }
    
    // Hash new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10)
    
    // Update user password
    user.password = hashedNewPassword
    user.updatedAt = new Date()
    
    return { message: 'Password updated successfully' }
  } catch (error) {
    throw new Error('Failed to change password')
  }
}

// Logout (client-side token removal)
const logout = async () => {
  await delay(100)
  return { message: 'Logged out successfully' }
}

export {
  login,
  register,
  refreshToken,
  getCurrentUser,
  changePassword,
  logout,
  verifyToken
}