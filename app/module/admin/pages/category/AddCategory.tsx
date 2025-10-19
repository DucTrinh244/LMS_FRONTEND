import React, { useEffect, useState } from "react";
import { categoryService } from "~/module/admin/services/CategoryApi";
import type { CategoryRequest } from "~/module/admin/types/Category";

interface AddCategoryProps {
  onBack: () => void;
  onSave: (category: {
    name: string;
    description: string;
    parentId?: string | null;
    priority: number;
  }) => void;
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
  const [sortOrder, setsortOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setParentId(category.parentId || null);
      setsortOrder(category.priority);
    } else {
      setName("");
      setDescription("");
      setParentId(null);
      setsortOrder(1);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }
    if (sortOrder < 1) {
      alert("Priority must be at least 1");
      return;
    }

    setLoading(true);
    try {
      const payload: CategoryRequest = { name, description, parentId, sortOrder };

      let savedCategory;
      if (category?.id) {
        // Update existing category
        // savedCategory = await updateCategory(category.id, payload);
      } else {
        // Add new category
        savedCategory = await categoryService.createCategory(payload);
      }

      onSave(savedCategory);
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border rounded-lg px-3 py-2 bg-gray-100 text-black placeholder:text-gray-500 " +
    "focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {category ? "Edit Category" : "Add New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className={inputClass}
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className={`${inputClass} h-24`}
            disabled={loading}
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Parent Category
          </label>
          <select
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value || null)}
            className={inputClass}
            disabled={loading}
          >
            <option value="">None</option>
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
            Priority
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setsortOrder(Number(e.target.value))}
            placeholder="Enter priority (1 or higher)"
            min="1"
            className={inputClass}
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : (category ? "Save Changes" : "Add Category")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;