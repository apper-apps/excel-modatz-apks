import { categoriesMockData } from '@/services/mockData/categories'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Service methods
export const getCategoriesService = async () => {
  await delay(200)
  return [...categoriesMockData]
}

export const getCategoryByIdService = async (id) => {
  await delay(200)
  const category = categoriesMockData.find(item => item.Id === id)
  if (!category) {
    throw new Error('Category not found')
  }
  return { ...category }
}

export const getCategoryBySlugService = async (slug) => {
  await delay(200)
  const category = categoriesMockData.find(item => item.slug === slug)
  if (!category) {
    throw new Error('Category not found')
  }
  return { ...category }
}

export const createCategoryService = async (categoryData) => {
  await delay(300)
  const newId = Math.max(...categoriesMockData.map(cat => cat.Id)) + 1
  const newCategory = {
    ...categoryData,
    Id: newId
  }
  categoriesMockData.push(newCategory)
  return { ...newCategory }
}

export const updateCategoryService = async (id, categoryData) => {
  await delay(300)
  const index = categoriesMockData.findIndex(cat => cat.Id === id)
  if (index === -1) {
    throw new Error('Category not found')
  }
  
  categoriesMockData[index] = {
    ...categoriesMockData[index],
    ...categoryData
  }
  
  return { ...categoriesMockData[index] }
}

export const deleteCategoryService = async (id) => {
  await delay(200)
  const index = categoriesMockData.findIndex(cat => cat.Id === id)
  if (index === -1) {
    throw new Error('Category not found')
  }
  
  categoriesMockData.splice(index, 1)
  return { success: true }
}