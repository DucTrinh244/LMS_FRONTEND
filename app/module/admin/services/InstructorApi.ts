import httpClient  from "~/services/httpClient";

export const instructorService = {
  getAllInstructors: (): Promise<any> => {
    return httpClient.post('/instructors').then((res) => res.data);
  },

  updateInstructor: (id: string, data: any): Promise<any> => {
    return httpClient.put(`/instructors/${id}`, data).then((res) => res.data);
  },

  getInstructorById: (id: string): Promise<any> => {
    return httpClient.get(`/instructors/${id}`).then((res) => res.data);
  },
  deleteInstructor: (id: string): Promise<any> => {
    return httpClient.delete(`/instructors/${id}`).then((res) => res.data);
  }
}