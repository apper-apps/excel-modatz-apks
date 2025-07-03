import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { changePassword, updateUser, clearError } from '@/store/slices/authSlice'
import { update } from '@/services/api/userService'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Profile = () => {
  const { user, loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [profileLoading, setProfileLoading] = useState(false)
  
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || ''
      })
    }
  }, [user])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    
    try {
      const updatedUser = await update(user.Id, profileData)
      dispatch(updateUser(updatedUser))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setProfileLoading(false)
    }
  }
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }
    
    try {
      await dispatch(changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })).unwrap()
      
      toast.success('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      // Error handled by useEffect
    }
  }
  
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'password', label: 'Password', icon: 'Lock' }
  ]
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="User" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-primary-100">@{user.username}</p>
                <p className="text-primary-100 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileInputChange}
                      icon="User"
                      required
                    />
                    
                    <Input
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileInputChange}
                      icon="User"
                      required
                    />
                  </div>
                  
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileInputChange}
                    icon="AtSign"
                    required
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    icon="Mail"
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={profileLoading}
                    disabled={profileLoading}
                  >
                    Update Profile
                  </Button>
                </form>
              </motion.div>
            )}
            
            {activeTab === 'password' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      label="Current Password"
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordInputChange}
                      icon="Lock"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      <ApperIcon name={showPasswords.current ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      label="New Password"
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      icon="Lock"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      <ApperIcon name={showPasswords.new ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      label="Confirm New Password"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      icon="Lock"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      <ApperIcon name={showPasswords.confirm ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                  >
                    Change Password
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile