import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";
import "../styles/project.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProjectCrud() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion: "",
    technologies: "",
    image: null,
    link: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await getProjects();
      console.log("GET PROJECTS:", res);

      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("SUBMIT FIRED");
    console.log("editingId:", editingId);
    console.log("formData:", formData);

    try {
      let res;

      if (editingId) {
        res = await updateProject(editingId, formData);
      } else {
        res = await createProject(formData);
      }

      console.log("PROJECT RESPONSE:", res);

      if (res.success) {
        resetForm();
        loadProjects();
        alert(editingId ? "Project updated successfully." : "Project added successfully.");
      } else {
        alert(res.message || "Project request failed.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submit crashed. Check console.");
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      completion: project.completion
        ? project.completion.substring(0, 10)
        : "",
      technologies: project.technologies || "",
      image: null,
      link: project.link || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    console.log("DELETE FIRED:", id);

    try {
      const res = await deleteProject(id);
      console.log("DELETE RESPONSE:", res);

      if (res.success) {
        loadProjects();
        alert("Project deleted successfully.");
      } else {
        alert(res.message || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete crashed. Check console.");
    }
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      completion: "",
      technologies: "",
      image: null,
      link: "",
    });
  }

  return (
    <section className="projects">
      <h2>Project Management</h2>

      <form onSubmit={handleSubmit} className="projects-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="completion"
          value={formData.completion}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma separated)"
          value={formData.technologies}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <input
          type="text"
          name="link"
          placeholder="Project Link"
          value={formData.link}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {project.technologies && (
              <p>
                <strong>Tech:</strong> {project.technologies}
              </p>
            )}

            <p>
              <strong>Date:</strong>{" "}
              {project.completion
                ? new Date(project.completion).toLocaleDateString()
                : "N/A"}
            </p>

            {project.image && (
              <div className="project-card__gallery project-card__gallery--two">
                <figure>
                  <img
                    src={`${BASE_URL}${project.image}`}
                    alt={project.title}
                    className="zoomable"
                  />
                </figure>
              </div>
            )}

            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Project
                </a>
              </p>
            )}

            <button type="button" onClick={() => handleEdit(project)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(project.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </section>
  );
}