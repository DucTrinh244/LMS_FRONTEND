import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userAdminService } from '~/module/admin/services/UserApi';
import type {
  AdminUserDto,
  CreateAdminUserDto,
  UpdateAdminUserDto,
  GetUsersParams,
  UserStatsDto,
} from '~/module/admin/types/User';
import { useToast } from '~/shared/hooks/useToast';

const USER_ADMIN_QUERY_KEY = ['admin-users'];
const USER_STATS_QUERY_KEY = ['admin-users-stats'];

export function useUserAdmin(params?: GetUsersParams) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch users list
  const {
    data: usersData,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...USER_ADMIN_QUERY_KEY, params],
    queryFn: async () => {
      return await userAdminService.getUsers(params);
    },
    retry: 1,
  });

  // Fetch user stats
  const {
    data: stats,
    isLoading: loadingStats,
    refetch: refetchStats,
  } = useQuery<UserStatsDto>({
    queryKey: USER_STATS_QUERY_KEY,
    queryFn: async () => {
      return await userAdminService.getUsersStats();
    },
    retry: 1,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: (data: CreateAdminUserDto) => userAdminService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ADMIN_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_STATS_QUERY_KEY });
      toast.success('User created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminUserDto }) =>
      userAdminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ADMIN_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_STATS_QUERY_KEY });
      toast.success('User updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userAdminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ADMIN_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_STATS_QUERY_KEY });
      toast.success('User deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });

  return {
    // Users list
    users: usersData?.items || [],
    totalCount: usersData?.totalCount || 0,
    page: usersData?.page || 1,
    pageSize: usersData?.pageSize || 10,
    totalPages: usersData?.totalPages || 0,
    loading,
    error: error?.message || null,
    refetch,

    // Stats
    stats,
    loadingStats,
    refetchStats,

    // Mutations
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
}

// Hook to get single user by ID
export function useUserById(id: string | null) {
  const { toast } = useToast();

  const {
    data: user,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<AdminUserDto>({
    queryKey: ['admin-user', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('User ID is required');
      }
      return await userAdminService.getUserById(id);
    },
    enabled: !!id,
    retry: 1,
  });

  return {
    user,
    loading,
    error: error?.message || null,
    refetch,
  };
}

