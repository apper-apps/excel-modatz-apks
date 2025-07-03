import bcrypt from 'bcryptjs'

// Pre-hashed passwords for demo users
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

const users = [
  {
    Id: 1,
    username: 'admin',
    email: 'admin@modatz.com',
    password: hashPassword('admin123'),
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: null,
    bio: 'System administrator',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    Id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    password: hashPassword('password123'),
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    avatar: null,
    bio: 'Android enthusiast and app developer',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    Id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: hashPassword('password123'),
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'user',
    avatar: null,
    bio: 'Mobile app tester and reviewer',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05')
  }
]

export default users