import { Edit, Plus, Trash2, Mail, User, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useInstructor } from "~/module/admin/hooks/useInstructor";
import type { InstructorDetail } from "~/module/admin/types/Instructor";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";
// import { useInstructor } from "~/module/admin/hooks/useInstructor";
// import type { InstructorDetail } from "~/module/admin/types/Instructor";
// import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";
// import AddInstructor from "./AddInstructor";

const InstructorPage: React.FC = () => {
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorDetail | null>(null);
  const { confirm } = useConfirmDialog();

  const {
    instructors,
    loading,
    error,
    deleteInstructor,
    // createInstructor,
    updateInstructor,
    isDeleting,
  } = useInstructor();

  // Loading & Error
  // if (loading) return <p className="text-black">Đang tải danh sách giảng viên...</p>;
  // if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  // Xử lý xóa giảng viên
  const handleDelete = async (id: string) => {
    const ok = await confirm("Bạn có chắc muốn xóa giảng viên này? Dữ liệu không thể khôi phục.");
    if (ok) {
      // await deleteInstructor(id);
    }
  };

  // Xử lý thêm hoặc cập nhật giảng viên
  const handleSave = async (data: {
    id?: string;
    fullName: string;
    email: string;
    phone?: string;
    specialty: string;
    bio?: string;
    isActive: boolean;
  }) => {
    const requestData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      specialty: data.specialty,
      bio: data.bio || null,
      isActive: data.isActive,
    };

    if (selectedInstructor) {
      // await updateInstructor(selectedInstructor.id, requestData);
    } else {
      // await createInstructor(requestData);
    }

    setMode("list");
    setSelectedInstructor(null);
  };

  // Chuyển sang form thêm/sửa
  // if (mode === "add" || mode === "edit") {
  //   return (
  //     <AddInstructor
  //       onBack={() => {
  //         setMode("list");
  //         setSelectedInstructor(null);
  //       }}
  //       onSave={handleSave}
  //       instructor={
  //         mode === "edit" && selectedInstructor
  //           ? selectedInstructor
  //           : null
  //       }
  //     />
  //   );
  // }

  // Hiển thị trạng thái hoạt động
  const renderStatus = (isActive: boolean) => {
    return isActive ? (
      <span className="flex items-center gap-1 text-green-600">
        <CheckCircle className="w-4 h-4" /> Hoạt động
      </span>
    ) : (
      <span className="flex items-center gap-1 text-red-600">
        <XCircle className="w-4 h-4" /> Ngừng hoạt động
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Giảng viên</h2>
        <button
          onClick={() => setMode("add")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" /> Thêm giảng viên
        </button>
      </div>

      {/* Bảng danh sách giảng viên */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">Họ tên</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Chuyên môn</th>
              <th className="p-3 font-medium">Trạng thái</th>
              <th className="p-3 font-medium">Ngày tham gia</th>
              <th className="p-3 text-center font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {
            instructors.length > 0 ? (
              instructors.map((instructor, index) => (
                <tr
                  key={instructor.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {instructor.fullName}
                  </td>
                  <td className="p-3 text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {instructor.email}
                  </td>
                  <td className="p-3 text-gray-700">{instructor.specialty}</td>
                  <td className="p-3">{renderStatus(instructor.isActive)}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(instructor.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedInstructor(instructor);
                        setMode("edit");
                      }}
                      className="p-2 hover:bg-purple-100 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      // disabled={isDeleting}
                      className="p-2 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 p-6 italic">
                  Chưa có giảng viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorPage;