export interface Course {
  id: string
  title: string
  instructor: string
  price: number
  image: string
  category: string
  status: 'pending' | 'active' | 'inactive' | 'rejected'
  students: number
  duration: string
  description: string
  revenue: number
  rating: number
  reviews: number
  createdAt: string
}
export interface CourseEditAdminRequest{
  
}