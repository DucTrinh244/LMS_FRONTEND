import { useQuery } from "@tanstack/react-query"
import { adminDashboardService } from "~/module/admin/services/DashboardApi"
import type { AdminDashboardSummaryDto } from "~/module/admin/types/dashboard"
import { useToast } from "~/shared/hooks/useToast"

const ADMIN_DASHBOARD_SUMMARY_QUERY_KEY = "admin-dashboard-summary"

export function useDashboardSummary() {
  const { toast } = useToast()

  const {
    data: summary,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<AdminDashboardSummaryDto>({
    queryKey: [ADMIN_DASHBOARD_SUMMARY_QUERY_KEY],
    queryFn: async () => {
      const res = await adminDashboardService.getSummary()
      return res
    },
    retry: 1,
    onError: (err: any) => {
      toast.error(err.message || "Failed to fetch dashboard summary")
    },
  })

  return {
    summary,
    loading,
    error: error?.message || null,
    refetch,
  }
}

