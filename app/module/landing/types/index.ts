// Course Type
export interface Course {
  id: number
  title: string
  instructor: string
  avatar: string
  category: string
  rating: number
  reviews: number
  students: number
  price: number
  originalPrice: number
  image: string
  lessons: number
  duration: string
  level: string
}

// Category Type
export interface Category {
  name: string
  icon: string
  count: number
  color: string
}

// Feature Type
export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

// Instructor Type
export interface Instructor {
  id: number
  name: string
  title: string
  avatar: string
  students: number
  courses: number
  rating: number
}

// Stat Type
export interface Stat {
  number: string
  label: string
}
