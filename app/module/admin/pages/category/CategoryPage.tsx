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
  const { confirm } = useConfirmDialog();
  const { toast } = useToast();

  // Giả lập dữ liệu ban đầu (thay bằng API nếu có)
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
        setCategories((prev) => prev.filter((c) => c.id !== id));
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
      // Cập nhật
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory
            ? { ...c, ...category, createdAt: c.createdAt }
            : c
        )
      );
      toast.success("Cập nhật thành công!");
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
      toast.success("Thêm danh mục thành công!");
    }

    setMode("list");
    setSelectedCategory(null);
  };

  // Nếu đang ở chế độ thêm hoặc sửa
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">📂 Categories</h2>
        <button
          onClick={() => setMode("add")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" /> Add Category
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Description</th>
              <th className="p-3 font-medium">Created At</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Priority</th>
              <th className="p-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold">{cat.name}</td>
                  <td className="p-3 text-gray-700">{cat.description}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        cat.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="p-3">{cat.priority}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMode("edit");
                      }}
                      className="p-2 hover:bg-purple-100 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 p-6 italic"
                >
                  No categories found.
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
