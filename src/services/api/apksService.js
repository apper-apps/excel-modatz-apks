import { apksMockData } from '@/services/mockData/apks'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Service methods
export const getApksService = async () => {
  await delay(300)
  return [...apksMockData]
}

export const getApkByIdService = async (id) => {
  await delay(200)
  const apk = apksMockData.find(item => item.Id === id)
  if (!apk) {
    throw new Error('APK not found')
  }
  return { ...apk }
}

export const getApksByCategoryService = async (categorySlug, options = {}) => {
  await delay(400)
  const { page = 1, limit = 12, sortBy = 'newest', categories = [], minSize = '', maxSize = '' } = options
  
  let filteredApks = [...apksMockData]
  
  // Filter by category slug (mock implementation)
  if (categorySlug && categorySlug !== 'all') {
    // In real implementation, this would filter by category
    // For now, return all APKs
  }
  
  // Filter by additional categories
  if (categories.length > 0) {
    filteredApks = filteredApks.filter(apk => categories.includes(apk.category_id))
  }
  
  // Filter by size range
  if (minSize) {
    filteredApks = filteredApks.filter(apk => apk.size >= parseInt(minSize) * 1024 * 1024)
  }
  if (maxSize) {
    filteredApks = filteredApks.filter(apk => apk.size <= parseInt(maxSize) * 1024 * 1024)
  }
  
  // Sort APKs
  switch (sortBy) {
    case 'downloads':
      filteredApks.sort((a, b) => b.download_count - a.download_count)
      break
    case 'views':
      filteredApks.sort((a, b) => b.views - a.views)
      break
    case 'title':
      filteredApks.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'newest':
    default:
      filteredApks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
  }
  
  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedApks = filteredApks.slice(startIndex, endIndex)
  
  return {
    apks: paginatedApks,
    total: filteredApks.length,
    totalPages: Math.ceil(filteredApks.length / limit),
    currentPage: page
  }
}

export const searchApksService = async (query, options = {}) => {
  await delay(400)
  const { page = 1, limit = 12, sortBy = 'relevance', categories = [], minSize = '', maxSize = '' } = options
  
  let filteredApks = [...apksMockData]
  
  // Search by title, description, or mod features
  if (query) {
    const searchTerm = query.toLowerCase()
    filteredApks = filteredApks.filter(apk => 
      apk.title.toLowerCase().includes(searchTerm) ||
      apk.description.toLowerCase().includes(searchTerm) ||
      (apk.mod_features && apk.mod_features.toLowerCase().includes(searchTerm))
    )
  }
  
  // Filter by categories
  if (categories.length > 0) {
    filteredApks = filteredApks.filter(apk => categories.includes(apk.category_id))
  }
  
  // Filter by size range
  if (minSize) {
    filteredApks = filteredApks.filter(apk => apk.size >= parseInt(minSize) * 1024 * 1024)
  }
  if (maxSize) {
    filteredApks = filteredApks.filter(apk => apk.size <= parseInt(maxSize) * 1024 * 1024)
  }
  
  // Sort APKs
  switch (sortBy) {
    case 'downloads':
      filteredApks.sort((a, b) => b.download_count - a.download_count)
      break
    case 'views':
      filteredApks.sort((a, b) => b.views - a.views)
      break
    case 'title':
      filteredApks.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'newest':
      filteredApks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'relevance':
    default:
      // Keep original order for relevance
      break
  }
  
  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedApks = filteredApks.slice(startIndex, endIndex)
  
  return {
    apks: paginatedApks,
    total: filteredApks.length,
    totalPages: Math.ceil(filteredApks.length / limit),
    currentPage: page
  }
}

export const createApkService = async (apkData) => {
  await delay(500)
  const newId = Math.max(...apksMockData.map(apk => apk.Id)) + 1
  const newApk = {
    ...apkData,
    Id: newId,
    download_count: 0,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  apksMockData.push(newApk)
  return { ...newApk }
}

export const updateApkService = async (id, apkData) => {
  await delay(500)
  const index = apksMockData.findIndex(apk => apk.Id === id)
  if (index === -1) {
    throw new Error('APK not found')
  }
  
  apksMockData[index] = {
    ...apksMockData[index],
    ...apkData,
    updated_at: new Date().toISOString()
  }
  
  return { ...apksMockData[index] }
}

export const deleteApkService = async (id) => {
  await delay(300)
  const index = apksMockData.findIndex(apk => apk.Id === id)
  if (index === -1) {
    throw new Error('APK not found')
  }
  
  apksMockData.splice(index, 1)
  return { success: true }
}

export const incrementDownloadCountService = async (id) => {
  await delay(200)
  const index = apksMockData.findIndex(apk => apk.Id === id)
  if (index === -1) {
    throw new Error('APK not found')
  }
  
  apksMockData[index].download_count += 1
  return { ...apksMockData[index] }
}

export const incrementViewCountService = async (id) => {
  await delay(200)
  const index = apksMockData.findIndex(apk => apk.Id === id)
  if (index === -1) {
    throw new Error('APK not found')
  }
  
  apksMockData[index].views += 1
  return { ...apksMockData[index] }
}