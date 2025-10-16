import React, { useEffect, useState } from "react";

interface AddCategoryProps {
  onBack: () => void;
  onSave: (category: {
    name: string;
    description: string;
    status: "Active" | "Inactive";
    priority: number;
  }) => void;
  category?: {
    id?: string;
    name: string;
    description: string;
    createdAt?: string;
    status: "Active" | "Inactive";
    priority: number;
  } | null;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onBack, onSave, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [priority, setPriority] = useState<number>(1);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setStatus(category.status);
      setPriority(category.priority);
    } else {
      setName("");
      setDescription("");
      setStatus("Active");
      setPriority(1);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }
    if (priority < 1) {
      alert("Priority must be at least 1");
      return;
    }
    onSave({ name, description, status, priority });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {category ? "Edit Category" : "Add New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border rounded-lg px-3 py-2 h-24 bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:bg-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Priority</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            placeholder="Enter priority (1 or higher)"
            min="1"
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {category ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;