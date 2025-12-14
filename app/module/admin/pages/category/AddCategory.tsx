import React, { useEffect, useState } from "react";

interface AddCategoryProps {
  onBack: () => void;
  onSave: (category: {
    id: string;
    name: string;
    description: string;
    parentId?: string | null;
    priority: number;
    isActive: boolean;
  }) => Promise<void>;
  category?: {
    id?: string;
    name: string;
    description: string;
    createdAt?: string;
    parentId?: string | null;
    priority: number;
    isActive?: boolean;
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
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
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
      setIsActive(category.isActive ?? true);
    } else {
      setName("");
      setDescription("");
      setParentId(null);
      setSortOrder(0);
      setIsActive(true);
    }
    setErrors({});
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; sortOrder?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Tên danh mục không được để trống";
    }

    if (sortOrder < 0) {
      newErrors.sortOrder = "Thứ tự ưu tiên phải lớn hơn hoặc bằng 0";
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
        id: category?.id || '',
        name: name.trim(),
        description: description.trim(),
        parentId: parentId || null,
        priority: sortOrder,
        isActive,
      });
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full border rounded-lg px-3 py-2 bg-slate-700 text-white placeholder:text-slate-400 
    focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none transition
    ${hasError ? "border-red-500" : "border-slate-600"}`;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        {category ? "✏️ Chỉnh sửa danh mục" : "➕ Thêm danh mục mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Tên danh mục <span className="text-red-400">*</span>
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
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
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
          <label className="block text-slate-300 font-medium mb-1">
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

        {/* Sort Order */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Thứ tự sắp xếp <span className="text-red-400">*</span>
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
            placeholder="Nhập thứ tự sắp xếp (từ 0 trở lên)"
            min="0"
            className={inputClass(!!errors.sortOrder)}
            disabled={loading}
          />
          {errors.sortOrder && (
            <p className="text-red-400 text-sm mt-1">{errors.sortOrder}</p>
          )}
          <p className="text-slate-400 text-xs mt-1">
            Số càng nhỏ, danh mục càng hiển thị ở vị trí trên
          </p>
        </div>

        {/* Is Active */}
        <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 text-violet-600 border-slate-600 rounded focus:ring-violet-500 focus:ring-2 cursor-pointer bg-slate-700"
            disabled={loading}
          />
          <label htmlFor="isActive" className="text-slate-300 font-medium cursor-pointer select-none">
            Kích hoạt danh mục
          </label>
        </div>
        <p className="text-slate-400 text-xs -mt-2 ml-8">
          Chỉ danh mục được kích hoạt mới hiển thị trên website
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition disabled:opacity-50"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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