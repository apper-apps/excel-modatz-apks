import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { getApksService, createApkService, updateApkService, deleteApkService } from '@/services/api/apksService'
import { getCategoriesService } from '@/services/api/categoriesService'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('apks')
  const [apks, setApks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingApk, setEditingApk] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    package_name: '',
    version: '',
    size: '',
    category_id: '',
    description: '',
    mod_features: '',
    changelog: '',
    icon_url: '',
    download_url: '',
    screenshots: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [apksData, categoriesData] = await Promise.all([
        getApksService(),
        getCategoriesService()
      ])
      
      setApks(apksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const apkData = {
        ...formData,
        size: parseInt(formData.size) || 0,
        category_id: parseInt(formData.category_id) || 1,
        screenshots: formData.screenshots ? formData.screenshots.split(',').map(s => s.trim()) : []
      }

      if (editingApk) {
        await updateApkService(editingApk.Id, apkData)
        toast.success('APK updated successfully!')
      } else {
        await createApkService(apkData)
        toast.success('APK created successfully!')
      }

      setShowForm(false)
      setEditingApk(null)
      resetForm()
      loadData()
    } catch (err) {
      toast.error('Failed to save APK')
    }
  }

  const handleEdit = (apk) => {
    setEditingApk(apk)
    setFormData({
      title: apk.title,
      package_name: apk.package_name,
      version: apk.version,
      size: apk.size.toString(),
      category_id: apk.category_id.toString(),
      description: apk.description,
      mod_features: apk.mod_features || '',
      changelog: apk.changelog || '',
      icon_url: apk.icon_url || '',
      download_url: apk.download_url || '',
      screenshots: Array.isArray(apk.screenshots) ? apk.screenshots.join(', ') : ''
    })
    setShowForm(true)
  }

  const handleDelete = async (apk) => {
    if (window.confirm(`Are you sure you want to delete "${apk.title}"?`)) {
      try {
        await deleteApkService(apk.Id)
        toast.success('APK deleted successfully!')
        loadData()
      } catch (err) {
        toast.error('Failed to delete APK')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      package_name: '',
      version: '',
      size: '',
      category_id: '',
      description: '',
      mod_features: '',
      changelog: '',
      icon_url: '',
      download_url: '',
      screenshots: ''
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
              <ApperIcon name="Settings" className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your APK collection</p>
            </div>
          </div>
          
          <Button
            onClick={() => {
              setShowForm(true)
              setEditingApk(null)
              resetForm()
            }}
            icon="Plus"
          >
            Add New APK
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total APKs</p>
              <p className="text-2xl font-bold text-gray-900">{apks.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <ApperIcon name="Smartphone" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(apks.reduce((sum, apk) => sum + apk.download_count, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <ApperIcon name="Download" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <ApperIcon name="Grid3x3" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* APK Form Modal */}
      {showForm && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingApk ? 'Edit APK' : 'Add New APK'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                icon="X"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  label="Package Name"
                  value={formData.package_name}
                  onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                  required
                />
                <Input
                  label="Version"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  required
                />
                <Input
                  label="Size (bytes)"
                  type="number"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  required
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.Id} value={category.Id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Icon URL"
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                />
                <Input
                  label="Download URL"
                  value={formData.download_url}
                  onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <Input
                label="Mod Features (comma-separated)"
                value={formData.mod_features}
                onChange={(e) => setFormData({ ...formData, mod_features: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Changelog
                </label>
                <textarea
                  value={formData.changelog}
                  onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <Input
                label="Screenshots (comma-separated URLs)"
                value={formData.screenshots}
                onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
              />

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  {editingApk ? 'Update APK' : 'Create APK'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* APK List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">APK Management</h2>
        
        {apks.length === 0 ? (
          <Empty 
            title="No APKs found"
            description="Start by adding your first APK"
            action={{
              label: 'Add APK',
              icon: 'Plus',
              onClick: () => setShowForm(true)
            }}
          />
        ) : (
          <div className="space-y-4">
            {apks.map((apk) => (
              <Card key={apk.Id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {apk.icon_url ? (
                      <img 
                        src={apk.icon_url} 
                        alt={apk.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <ApperIcon name="Smartphone" className="w-8 h-8 text-primary-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{apk.title}</h3>
                        <p className="text-sm text-gray-500">v{apk.version} • {formatFileSize(apk.size)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(apk)}
                          icon="Edit"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(apk)}
                          icon="Trash2"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {apk.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ApperIcon name="Download" className="w-4 h-4" />
                        {formatNumber(apk.download_count)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ApperIcon name="Eye" className="w-4 h-4" />
                        {formatNumber(apk.views)}
                      </span>
                      <Badge variant="secondary" size="sm">
                        {categories.find(c => c.Id === apk.category_id)?.name || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminDashboard