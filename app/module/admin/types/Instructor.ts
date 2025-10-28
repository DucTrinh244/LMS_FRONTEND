export interface InstructorDetail {
  id: string
  fullName: string
  email: string
  phone?: string | null
  specialty: string
  bio?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}
