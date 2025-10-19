import axios from 'axios'
import { useEffect, useState } from 'react'
import type { Category } from '~/module/admin/types/Category'
import { useToast } from '~/shared/hooks/useToast'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data)
      } catch (err) {
        setError('Failed to fetch categories')
        toast.error('Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [toast])

  // Add or update a category
  const saveCategory = async (
    category: {
      name: string
      description: string
      parentId: string | null
      priority: number
    },
    id?: string
  ) => {
    try {
      if (id) {
        // Update category
        const response = await axios.put(`/api/categories/${id}`, category)
        setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...response.data } : c)))
        toast.success('Category updated successfully!')
      } else {
        // Add new category
        const response = await axios.post('/api/categories', category)
        setCategories((prev) => [...prev, response.data])
        toast.success('Category added successfully!')
      }
    } catch (err) {
      toast.error('Failed to save category')
    }
  }

  // Delete a category
  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      setCategories((prev) => prev.filter((c) => c.id !== id))
      toast.success('Category deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete category')
    }
  }

  return { categories, loading, error, saveCategory, deleteCategory }
}
