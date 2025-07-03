import React from "react";
import Error from "@/components/ui/Error";
import users from "@/services/mockData/users";

let userData = [...users]
let nextId = Math.max(...userData.map(u => u.Id)) + 1

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Get all users
const getAll = async () => {
  await delay(300)
  return userData.map(user => {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  })
}

// Get user by ID
const getById = async (id) => {
  await delay(200)
  
  const userId = parseInt(id)
  if (isNaN(userId) || userId <= 0) {
    throw new Error('Invalid user ID')
  }
  
  const user = userData.find(u => u.Id === userId)
  if (!user) {
    throw new Error('User not found')
  }
  
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Create new user (admin only)
const create = async (item) => {
  await delay(400)
  
  const { username, email, firstName, lastName, role = 'user', bio = '' } = item
  
  if (!username || !email || !firstName || !lastName) {
    throw new Error('Required fields: username, email, firstName, lastName')
  }
  
  // Check if user already exists
  const existingUser = userData.find(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    u.email.toLowerCase() === email.toLowerCase()
  )
  
  if (existingUser) {
    throw new Error('User already exists')
  }
  
  const newUser = {
    Id: nextId++,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: '', // Password should be set separately
    firstName,
    lastName,
    role,
    avatar: null,
    bio,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  userData.push(newUser)
  
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

// Update user
const update = async (id, data) => {
  await delay(300)
  
  const userId = parseInt(id)
  if (isNaN(userId) || userId <= 0) {
    throw new Error('Invalid user ID')
  }
  
  const userIndex = userData.findIndex(u => u.Id === userId)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  const user = userData[userIndex]
  
  // Don't allow updating Id, password, or createdAt
  const { Id: _, password: __, createdAt: ___, ...updateData } = data
  
  // Check for duplicate username/email if being updated
  if (updateData.username || updateData.email) {
    const existingUser = userData.find(u => 
      u.Id !== userId && (
        (updateData.username && u.username.toLowerCase() === updateData.username.toLowerCase()) ||
        (updateData.email && u.email.toLowerCase() === updateData.email.toLowerCase())
      )
    )
    
    if (existingUser) {
      throw new Error('Username or email already exists')
    }
  }
  
  // Update user
  userData[userIndex] = {
    ...user,
    ...updateData,
    username: updateData.username ? updateData.username.toLowerCase() : user.username,
    email: updateData.email ? updateData.email.toLowerCase() : user.email,
    updatedAt: new Date()
  }
  
  const { password: _, ...userWithoutPassword } = userData[userIndex]
  return userWithoutPassword
}

// Delete user
const deleteUser = async (id) => {
  await delay(200)
  
  const userId = parseInt(id)
  if (isNaN(userId) || userId <= 0) {
    throw new Error('Invalid user ID')
  }
  
  const userIndex = userData.findIndex(u => u.Id === userId)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  userData.splice(userIndex, 1)
  return { message: 'User deleted successfully' }
}

// Search users
const search = async (query) => {
  await delay(250)
  
  const searchQuery = query.toLowerCase()
  const filteredUsers = userData.filter(user => 
    user.username.toLowerCase().includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery) ||
    user.firstName.toLowerCase().includes(searchQuery) ||
    user.lastName.toLowerCase().includes(searchQuery)
  )
  
  return filteredUsers.map(user => {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  })
}

export {
  getAll,
  getById,
  create,
  update,
  deleteUser,
  search
}