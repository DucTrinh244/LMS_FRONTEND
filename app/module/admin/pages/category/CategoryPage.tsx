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


  if (loading) return <p className="text-slate-300">Đang tải danh mục...</p>;
  if (error) return <p className="text-red-400">Lỗi: {error}</p>;

  // 🔥 Hàm xóa danh mục
  const handleDelete = async (id: string) => {
    const ok = await confirm("Bạn có chắc muốn xóa danh mục này?");
    if (ok) {
      await deleteCategory(id);
    }
  };

  // 🔥 Hàm thêm hoặc cập nhật danh mục
  const handleSave = async (data: {
    id: string;
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
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">📂 Danh mục</h2>
        <button
          onClick={() => setMode("add")}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-purple-700 transition"
        >
          <Plus className="w-5 h-5" /> Thêm danh mục
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-slate-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-700 text-slate-300">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">Tên danh mục</th>
              <th className="p-3 font-medium">Mô tả</th>
              <th className="p-3 font-medium">Ngày tạo</th>
              <th className="p-3 font-medium">Danh mục cha</th>
              <th className="p-3 font-medium">Thứ tự</th>
              <th className="p-3 text-center font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} className="border-t border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold">{cat.name}</td>
                  <td className="p-3 text-slate-300">{cat.description}</td>
                  <td className="p-3 text-slate-400">
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
                      className="p-2 hover:bg-violet-600/20 rounded-lg transition text-slate-400 hover:text-violet-400"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={isDeleting}
                      className="p-2 hover:bg-red-600/20 rounded-lg transition disabled:opacity-50 text-slate-400 hover:text-red-400"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-slate-400 p-6 italic">
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