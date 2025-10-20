import React, { useEffect, useState } from "react";

interface AddCategoryProps {
  onBack: () => void;
  onSave: (category: {
    name: string;
    description: string;
    parentId?: string | null;
    priority: number;
  }) => Promise<void>;
  category?: {
    id?: string;
    name: string;
    description: string;
    createdAt?: string;
    parentId?: string | null;
    priority: number;
  } | null;
  categories: {
    id: string;
    name: string;
  }[];
}

const AddCategory: React.FC<AddCategoryProps> = ({ onBack, onSave, category, categories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    sortOrder?: string;
  }>({});

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setParentId(category.parentId || null);
      setSortOrder(category.priority);
    } else {
      setName("");
      setDescription("");
      setParentId(null);
      setSortOrder(1);
    }
    setErrors({});
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; sortOrder?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Tên danh mục không được để trống";
    }

    if (sortOrder < 1) {
      newErrors.sortOrder = "Thứ tự ưu tiên phải lớn hơn hoặc bằng 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        parentId: parentId || null,
        priority: sortOrder,
      });
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full border rounded-lg px-3 py-2 bg-gray-100 text-black placeholder:text-gray-500 
    focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition
    ${hasError ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {category ? "✏️ Chỉnh sửa danh mục" : "➕ Thêm danh mục mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors({ ...errors, name: undefined });
              }
            }}
            placeholder="Nhập tên danh mục"
            className={inputClass(!!errors.name)}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Mô tả
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả danh mục"
            className={`${inputClass()} h-24`}
            disabled={loading}
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Danh mục cha
          </label>
          <select
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value || null)}
            className={inputClass()}
            disabled={loading}
          >
            <option value="">Không có</option>
            {categories
              .filter((cat) => cat.id !== category?.id) // Prevent self-referencing
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Thứ tự ưu tiên <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(Number(e.target.value));
              if (errors.sortOrder) {
                setErrors({ ...errors, sortOrder: undefined });
              }
            }}
            placeholder="Nhập thứ tự ưu tiên (từ 1 trở lên)"
            min="1"
            className={inputClass(!!errors.sortOrder)}
            disabled={loading}
          />
          {errors.sortOrder && (
            <p className="text-red-500 text-sm mt-1">{errors.sortOrder}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang lưu...
              </>
            ) : (
              category ? "💾 Lưu thay đổi" : "➕ Thêm danh mục"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;