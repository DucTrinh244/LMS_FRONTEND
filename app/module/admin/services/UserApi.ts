import httpClient from '~/services/httpClient';
import type {
  BaseResponse,
  AdminUserDto,
  PagedUserResponse,
  UserStatsDto,
  CreateAdminUserDto,
  UpdateAdminUserDto,
  DeleteUserResponse,
  GetUsersParams,
} from '~/module/admin/types/User';

export const userAdminService = {
  /**
   * GET /api/User/admin/users
   * Lấy danh sách users với pagination, filter và search
   */
  getUsers: async (params?: GetUsersParams): Promise<PagedUserResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }
      if (params?.pageSize) {
        queryParams.append('pageSize', params.pageSize.toString());
      }
      if (params?.role && params.role !== 'all') {
        queryParams.append('role', params.role);
      }
      if (params?.status && params.status !== 'all') {
        queryParams.append('status', params.status);
      }
      if (params?.search) {
        queryParams.append('search', params.search);
      }

      const response = await httpClient.get<BaseResponse<PagedUserResponse>>(
        `/User/admin/users?${queryParams.toString()}`
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to fetch users');
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to fetch users'
      );
    }
  },

  /**
   * GET /api/User/admin/users/{id}
   * Lấy thông tin chi tiết của một user
   */
  getUserById: async (id: string): Promise<AdminUserDto> => {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }

      const response = await httpClient.get<BaseResponse<AdminUserDto>>(
        `/User/admin/users/${id}`
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to fetch user');
    } catch (error: any) {
      console.error('Error fetching user:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to fetch user'
      );
    }
  },

  /**
   * POST /api/User/admin/users
   * Tạo user mới
   */
  createUser: async (data: CreateAdminUserDto): Promise<AdminUserDto> => {
    try {
      const response = await httpClient.post<BaseResponse<AdminUserDto>>(
        '/User/admin/users',
        data
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to create user');
    } catch (error: any) {
      console.error('Error creating user:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to create user'
      );
    }
  },

  /**
   * PUT /api/User/admin/users/{id}
   * Cập nhật thông tin user
   */
  updateUser: async (id: string, data: UpdateAdminUserDto): Promise<AdminUserDto> => {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }

      const response = await httpClient.put<BaseResponse<AdminUserDto>>(
        `/User/admin/users/${id}`,
        data
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to update user');
    } catch (error: any) {
      console.error('Error updating user:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to update user'
      );
    }
  },

  /**
   * DELETE /api/User/admin/users/{id}
   * Xóa user (soft delete)
   */
  deleteUser: async (id: string): Promise<DeleteUserResponse> => {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }

      const response = await httpClient.delete<BaseResponse<DeleteUserResponse>>(
        `/User/admin/users/${id}`
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to delete user');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to delete user'
      );
    }
  },

  /**
   * GET /api/User/admin/users/stats
   * Lấy thống kê tổng quan về users
   */
  getUsersStats: async (): Promise<UserStatsDto> => {
    try {
      const response = await httpClient.get<BaseResponse<UserStatsDto>>(
        '/User/admin/users/stats'
      );

      if (response.data.isSuccess && response.data.value) {
        return response.data.value;
      }

      throw new Error(response.data.error?.message || 'Failed to fetch user stats');
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
      const apiError = error.response?.data;
      throw new Error(
        apiError?.error?.message || 
        apiError?.message || 
        error.message || 
        'Failed to fetch user stats'
      );
    }
  },
};

