import type {
  AdminCourseDetailDto,
  AdminCourseDto,
  AdminCourseStatsDto,
  DeleteCourseResponse,
  GetCoursesParams,
  PagedAdminCourseResponse,
  RejectCourseDto,
  ToggleCourseStatusDto,
  UpdateAdminCourseDto,
} from "~/module/admin/types/Course";
import httpClient from "~/services/httpClient";
import type { BaseResponse } from "~/shared/types/BaseResponse";

export const courseAdminService = {
  /**
   * GET /api/Course/admin/courses
   * Lấy danh sách courses với pagination, filter và search
   */
  getCourses: async (params: GetCoursesParams = {}): Promise<BaseResponse<PagedAdminCourseResponse>> => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString());
      if (params.status && params.status !== "all") queryParams.append("status", params.status);
      if (params.category) queryParams.append("category", params.category);
      if (params.instructorId) queryParams.append("instructorId", params.instructorId);
      if (params.search) queryParams.append("search", params.search);

      const response = await httpClient.get<BaseResponse<PagedAdminCourseResponse>>(
        `/Course/admin/courses?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to fetch courses"
      );
    }
  },

  /**
   * GET /api/Course/admin/courses/{id}
   * Lấy chi tiết course (bao gồm chapters, lessons, quizzes)
   */
  getCourseById: async (id: string): Promise<BaseResponse<AdminCourseDetailDto>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await httpClient.get<BaseResponse<AdminCourseDetailDto>>(
        `/Course/admin/courses/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching course detail:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to fetch course detail"
      );
    }
  },

  /**
   * PUT /api/Course/admin/courses/{id}
   * Cập nhật thông tin course
   */
  updateCourse: async (
    id: string,
    data: UpdateAdminCourseDto
  ): Promise<BaseResponse<AdminCourseDto>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await httpClient.put<BaseResponse<AdminCourseDto>>(
        `/Course/admin/courses/${id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating course:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to update course"
      );
    }
  },

  /**
   * DELETE /api/Course/admin/courses/{id}
   * Xóa course (soft delete)
   */
  deleteCourse: async (id: string): Promise<BaseResponse<DeleteCourseResponse>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await httpClient.delete<BaseResponse<DeleteCourseResponse>>(
        `/Course/admin/courses/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error deleting course:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to delete course"
      );
    }
  },

  /**
   * POST /api/Course/admin/courses/{id}/approve
   * Phê duyệt course (chuyển từ pending sang active)
   */
  approveCourse: async (id: string): Promise<BaseResponse<AdminCourseDto>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await httpClient.post<BaseResponse<AdminCourseDto>>(
        `/Course/admin/courses/${id}/approve`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error approving course:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to approve course"
      );
    }
  },

  /**
   * POST /api/Course/admin/courses/{id}/reject
   * Từ chối course (chuyển từ pending sang rejected)
   */
  rejectCourse: async (id: string, data: RejectCourseDto): Promise<BaseResponse<AdminCourseDto>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      if (!data.reason) {
        throw new Error("Rejection reason is required");
      }
      const response = await httpClient.post<BaseResponse<AdminCourseDto>>(
        `/Course/admin/courses/${id}/reject`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error rejecting course:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to reject course"
      );
    }
  },

  /**
   * PUT /api/Course/admin/courses/{id}/toggle-status
   * Chuyển đổi trạng thái active/inactive
   */
  toggleCourseStatus: async (
    id: string,
    data: ToggleCourseStatusDto
  ): Promise<BaseResponse<AdminCourseDto>> => {
    try {
      if (!id) {
        throw new Error("Course ID is required");
      }
      const response = await httpClient.put<BaseResponse<AdminCourseDto>>(
        `/Course/admin/courses/${id}/toggle-status`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error toggling course status:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message ||
        apiError?.message ||
        error.message ||
        "Failed to toggle course status"
      );
    }
  },

  /**
   * GET /api/Course/admin/courses/stats
   * Lấy thống kê tổng quan về courses
   */
  getCourseStats: async (): Promise<BaseResponse<AdminCourseStatsDto>> => {
    try {
      const response = await httpClient.get<BaseResponse<AdminCourseStatsDto>>(
        `/Course/admin/courses/stats`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching course stats:", error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || apiError?.message || error.message || "Failed to fetch course stats"
      );
    }
  },
};
