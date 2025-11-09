import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCategoryAdmin } from "~/module/admin/hooks/useCategoryAdmin";
import type { CategoryDetail } from "~/module/admin/types/Category";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";
import AddCategory from "./AddCategory";

const CategoryPage: React.FC = () => {
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetail | null>(null);
  const { confirm } = useConfirmDialog();
  
  const { 
    categories, 
    loading, 
    error, 
    deleteCategory, 
    createCategory, 
    updateCategory,
    isDeleting
  } = useCategoryAdmin();


  if (loading) return <p className="text-black">Đang tải danh mục...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  // 🔥 Hàm xóa danh mục
  const handleDelete = async (id: string) => {
    const ok = await confirm("Bạn có chắc muốn xóa danh mục này?");
    if (ok) {
      await deleteCategory(id);
    }
  };

  // 🔥 Hàm thêm hoặc cập nhật danh mục
  const handleSave = async (data: {
    id: string ;
    name: string;
    description: string;
    parentId?: string | null;
    priority: number;
    isActive: boolean;
  }) => {
    const requestData = {
      id: data.id,      
      name: data.name,
      description: data.description,
      parentId: data.parentId,
      sortOrder: data.priority,
      isActive: data.isActive
    };

    if (selectedCategory) {
      await updateCategory(selectedCategory.id, requestData);
    } else {
      await createCategory(requestData);
    }

    setMode("list");
    setSelectedCategory(null);
  };

  if (mode === "add" || mode === "edit") {
    return (
      <AddCategory
        onBack={() => {
          setMode("list");
          setSelectedCategory(null);
        }}
        onSave={handleSave}
        category={
          mode === "edit" && selectedCategory
            ? {
                ...selectedCategory,
                priority: selectedCategory.sortOrder ?? 0,
              }
            : null
        }
        categories={categories}
      />
    );
  }

  // Lấy tên danh mục cha
  const getParentName = (parentId: string | null | undefined) => {
    if (!parentId) return "None";
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  // Hiển thị danh sách danh mục
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">📂 Danh mục</h2>
        <button
          onClick={() => setMode("add")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" /> Thêm danh mục
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">Tên danh mục</th>
              <th className="p-3 font-medium">Mô tả</th>
              <th className="p-3 font-medium">Ngày tạo</th>
              <th className="p-3 font-medium">Danh mục cha</th>
              <th className="p-3 font-medium">Thứ tự</th>
              <th className="p-3 text-center font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold">{cat.name}</td>
                  <td className="p-3 text-gray-700">{cat.description}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">{getParentName(cat.parentId)}</td>
                  <td className="p-3">{cat.sortOrder ?? 0}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMode("edit");
                      }}
                      className="p-2 hover:bg-purple-100 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={isDeleting}
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
                  Không có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;