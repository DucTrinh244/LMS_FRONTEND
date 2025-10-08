import { Edit, Trash2 } from "lucide-react";

const UsersManagementContent: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Users Management</h2>
      <p className="text-gray-600 mb-6">Manage all users of the platform here.</p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Role</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example user data */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="py-3 px-4 text-sm text-gray-700">John Doe</td>
              <td className="py-3 px-4 text-sm text-gray-700">john.doe@example.com</td>
              <td className="py-3 px-4 text-sm text-gray-700">Student</td>
              <td className="py-3 px-4">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded-lg transition">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersManagementContent;