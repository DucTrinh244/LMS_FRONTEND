import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";
import { useToast } from "~/shared/hooks/useToast";
import AddCategory from "./AddCategory";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "Active" | "Inactive";
  priority: number;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {confirm} = useConfirmDialog();
  const {toast} = useToast();

  // Giả lập dữ liệu ban đầu (có thể thay bằng API)
  useEffect(() => {
    setCategories([
      {
        id: "1",
        name: "Web Development",
        description: "Learn to build websites.",
        createdAt: new Date().toISOString(),
        status: "Active",
        priority: 1,
      },
      {
        id: "2",
        name: "Design",
        description: "Master UI/UX design skills.",
        createdAt: new Date().toISOString(),
        status: "Active",
        priority: 2,
      },
      {
        id: "3",
        name: "Business",
        description: "Grow your business career.",
        createdAt: new Date().toISOString(),
        status: "Inactive",
        priority: 3,
      },
    ]);
  }, []);

  // Hàm xóa category
 const handleDelete = async (id: string) => {
  const ok = await confirm("Bạn có chắc muốn xóa danh mục này?");
  if (ok) {
    try {
      // await axios.delete(`/api/categories/${id}`);
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa!");
    }
  }
};

  // Hàm thêm hoặc chỉnh sửa category
  const handleSave = (category: {
    name: string;
    description: string;
    status: "Active" | "Inactive";
    priority: number;
  }) => {
    if (selectedCategory) {
      // Cập nhật category
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory
            ? { ...c, ...category, createdAt: c.createdAt }
            : c
        )
      );
    } else {
      // Thêm mới
      setCategories((prev) => [
        ...prev,
        {
          ...category,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setMode("list");
    setSelectedCategory(null);
  };

  // Nếu đang ở chế độ thêm hoặc chỉnh sửa
  if (mode === "add" || mode === "edit") {
    return (
      <AddCategory
        onBack={() => {
          setMode("list");
          setSelectedCategory(null);
        }}
        onSave={handleSave}
        category={
          mode === "edit"
            ? categories.find((c) => c.id === selectedCategory) || null
            : null
        }
      />
    );
  }

  // Hiển thị danh sách category
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => setMode("add")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" /> Add Category
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{cat.name}</td>
              <td className="p-3 text-gray-600">{cat.description}</td>
              <td className="p-3">{new Date(cat.createdAt).toLocaleDateString()}</td>
              <td className="p-3">{cat.status}</td>
              <td className="p-3">{cat.priority}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMode("edit");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 p-6">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;