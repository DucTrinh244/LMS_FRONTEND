import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseAdminService } from "~/module/admin/services/CourseAdminApi";
import type {
  AdminCourseDetailDto,
  AdminCourseStatsDto,
  GetCoursesParams,
  PagedAdminCourseResponse,
  RejectCourseDto,
  ToggleCourseStatusDto,
  UpdateAdminCourseDto
} from "~/module/admin/types/Course";
import { useToast } from "~/shared/hooks/useToast";

const COURSE_QUERY_KEY = "admin-courses";
const COURSE_STATS_QUERY_KEY = "admin-course-stats";

export function useCourseAdmin(params: GetCoursesParams = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch courses list
  const {
    data: coursesData,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<PagedAdminCourseResponse>({
    queryKey: [COURSE_QUERY_KEY, params],
    queryFn: async () => {
      const res = await courseAdminService.getCourses(params);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch courses");
    },
    retry: 1,
    placeholderData: (previousData) => previousData,
  });

  // Fetch course stats
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useQuery<AdminCourseStatsDto>({
    queryKey: [COURSE_STATS_QUERY_KEY],
    queryFn: async () => {
      const res = await courseAdminService.getCourseStats();
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch course stats");
    },
    retry: 1,
  });

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminCourseDto }) =>
      courseAdminService.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_STATS_QUERY_KEY] });
      toast.success("Course updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update course.");
    },
  });

  // Delete course mutation
  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => courseAdminService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_STATS_QUERY_KEY] });
      toast.success("Course deleted successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete course.");
    },
  });

  // Approve course mutation
  const approveCourseMutation = useMutation({
    mutationFn: (id: string) => courseAdminService.approveCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_STATS_QUERY_KEY] });
      toast.success("Course approved successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to approve course.");
    },
  });

  // Reject course mutation
  const rejectCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectCourseDto }) =>
      courseAdminService.rejectCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_STATS_QUERY_KEY] });
      toast.success("Course rejected successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to reject course.");
    },
  });

  // Toggle course status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ToggleCourseStatusDto }) =>
      courseAdminService.toggleCourseStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_STATS_QUERY_KEY] });
      toast.success("Course status updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to toggle course status.");
    },
  });

  return {
    courses: coursesData?.items || [],
    totalCount: coursesData?.totalCount || 0,
    totalPages: coursesData?.totalPages || 0,
    page: coursesData?.page || 1,
    pageSize: coursesData?.pageSize || 10,
    stats: coursesData?.stats || undefined,
    globalStats: stats,
    loading,
    statsLoading,
    error: error?.message || null,
    refetch,
    refetchStats,
    updateCourse: updateCourseMutation.mutateAsync,
    deleteCourse: deleteCourseMutation.mutateAsync,
    approveCourse: approveCourseMutation.mutateAsync,
    rejectCourse: rejectCourseMutation.mutateAsync,
    toggleStatus: toggleStatusMutation.mutateAsync,
    isUpdating: updateCourseMutation.isPending,
    isDeleting: deleteCourseMutation.isPending,
    isApproving: approveCourseMutation.isPending,
    isRejecting: rejectCourseMutation.isPending,
    isToggling: toggleStatusMutation.isPending,
  };
}

export function useCourseById(id: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<AdminCourseDetailDto>({
    queryKey: [COURSE_QUERY_KEY, id],
    queryFn: async () => {
      const res = await courseAdminService.getCourseById(id);
      if (res.isSuccess && res.value) {
        return res.value;
      }
      throw new Error(res.error?.message || "Failed to fetch course details");
    },
    enabled: !!id,
    retry: 1,
  });

  return {
    course,
    loading,
    error: error?.message || null,
    refetch,
  };
}
