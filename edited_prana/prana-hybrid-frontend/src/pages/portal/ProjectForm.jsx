import { useState } from "react";
import { createProject } from "../../services/projectService";

function ProjectForm() {
  const [formData, setFormData] = useState({
    site: "",
    client: "",
    name: "",
    slug: "",
    start_date: "",
    estimated_completion: "",
    budget: "",
    progress: 0,
    status: "pending",
    description: "",
    featured: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      setMessage("✅ Project registered successfully!");
      setFormData({
        site: "",
        client: "",
        name: "",
        slug: "",
        start_date: "",
        estimated_completion: "",
        budget: "",
        progress: 0,
        status: "pending",
        description: "",
        featured: false,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to register project.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register New Project</h2>
      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="number" name="site" placeholder="Site ID"
          value={formData.site} onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input type="number" name="client" placeholder="Client ID"
          value={formData.client} onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input type="text" name="name" placeholder="Project Name"
          value={formData.name} onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input type="text" name="slug" placeholder="Slug"
          value={formData.slug} onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input type="date" name="start_date"
          value={formData.start_date} onChange={handleChange}
          className="w-full p-2 border rounded" />

        <input type="date" name="estimated_completion"
          value={formData.estimated_completion} onChange={handleChange}
          className="w-full p-2 border rounded" />

        <input type="number" name="budget" placeholder="Budget"
          value={formData.budget} onChange={handleChange}
          className="w-full p-2 border rounded" />

        <input type="number" name="progress" placeholder="Progress %"
          value={formData.progress} onChange={handleChange}
          className="w-full p-2 border rounded" />

        <select name="status" value={formData.status}
          onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>

        <textarea name="description" placeholder="Description"
          value={formData.description} onChange={handleChange}
          className="w-full p-2 border rounded" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured"
            checked={formData.featured} onChange={handleChange} />
          Featured
        </label>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
