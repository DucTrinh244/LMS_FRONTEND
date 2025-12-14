import { Edit, Filter, Mail, Plus, Search, Shield, Trash2, UserCheck, Users, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { useUserAdmin } from "~/module/admin/hooks/useUserAdmin";
import { formatLastActive } from "~/module/admin/types/User";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";

const UsersManagementContent: React.FC = () => {
  const { confirm } = useConfirmDialog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'Student' | 'Instructor' | 'Admin' | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch users with filters
  const {
    users,
    totalCount,
    page,
    totalPages,
    loading,
    error,
    stats,
    loadingStats,
    deleteUser,
    isDeleting,
    refetch,
  } = useUserAdmin({
    page: currentPage,
    pageSize,
    role: filterRole !== 'all' ? filterRole : undefined,
    status: filterStatus !== 'all' ? filterStatus : undefined,
    search: searchTerm || undefined,
  });

  // Handle delete user
  const handleDelete = async (id: string) => {
    const ok = await confirm('Bạn có chắc muốn xóa user này?');
    if (ok) {
      try {
        await deleteUser(id);
      } catch (error) {
        // Error is handled by mutation
      }
    }
  };

  // Format stats for display
  const displayStats = useMemo(() => {
    if (stats) {
      return {
        total: stats.totalUsers,
        active: stats.activeUsers,
        students: stats.totalStudents,
        instructors: stats.totalInstructors,
      };
    }
    return {
      total: totalCount,
      active: users.filter(u => u.status === 'Active').length,
      students: users.filter(u => u.role === 'Student').length,
      instructors: users.filter(u => u.role === 'Instructor').length,
    };
  }, [stats, totalCount, users]);

  if (loading && !users.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error && !users.length) {
    return (
      <div className="bg-slate-800 rounded-xl border border-red-700 shadow-lg p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {loadingStats ? '...' : displayStats.total.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-slate-400">Total Users</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <UserCheck className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {loadingStats ? '...' : displayStats.active.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-slate-400">Active Users</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {loadingStats ? '...' : displayStats.students.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-slate-400">Students</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-orange-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {loadingStats ? '...' : displayStats.instructors.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-slate-400">Instructors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Users Management</h2>
            <p className="text-slate-400">Manage all users of the platform</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  refetch();
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value as 'Student' | 'Instructor' | 'Admin' | 'all');
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
          >
            <option value="all">All Roles</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as 'Active' | 'Inactive' | 'all');
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition text-slate-300">
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">User</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Email</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Role</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Status</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Last Active</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-slate-400">Loading users...</p>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                            <span className="text-violet-400 font-semibold text-sm">
                              {user.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-white">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${user.role === 'Admin' ? 'bg-red-600/20 text-red-400' :
                        user.role === 'Instructor' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-violet-600/20 text-violet-400'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 w-fit ${user.status === 'Active'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-slate-600/20 text-slate-400'
                        }`}>
                        {user.status === 'Active' ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserX className="w-3 h-3" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-400">
                      {formatLastActive(user.lastActiveAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-violet-600/20 rounded-lg transition text-slate-400 hover:text-violet-400" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                          className="p-1.5 hover:bg-red-600/20 rounded-lg transition text-slate-400 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Users className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
              <div className="text-sm text-slate-400">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount.toLocaleString()} users
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 rounded-lg transition ${currentPage === pageNum
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          } disabled:opacity-50`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagementContent;