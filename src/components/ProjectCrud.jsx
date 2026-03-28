import smartbudgetImg from "../assets/images/smartbudget.png";

import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

import "../styles/project.css";

export default function ProjectCrud() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion: "",
    technologies: "",
    image: "",
    link: "",
  });

  // ===============================
  // LOAD PROJECTS
  // ===============================
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await getProjects();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  }

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ===============================
  // HANDLE SUBMIT (CREATE / UPDATE)
  // ===============================
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        const res = await updateProject(editingId, formData);
        if (res.success) {
          resetForm();
          loadProjects();
        }
      } else {
        // CREATE
        const res = await createProject(formData);
        if (res.success) {
          resetForm();
          loadProjects();
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  // ===============================
  // EDIT PROJECT
  // ===============================
  function handleEdit(project) {
    setEditingId(project.id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      completion: project.completion
        ? project.completion.substring(0, 10)
        : "",
      technologies: project.technologies || "",
      image: project.image || "",
      link: project.link || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===============================
  // DELETE PROJECT
  // ===============================
  async function handleDelete(id) {
    try {
      const res = await deleteProject(id);
      if (res.success) {
        loadProjects();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  // ===============================
  // RESET FORM
  // ===============================
  function resetForm() {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      completion: "",
      technologies: "",
      image: "",
      link: "",
    });
  }

  return (
    <section className="projects">
      <h2>Project Management</h2>

      {/* ================= FORM ================= */}
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
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
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

      {/* ================= PROJECT LIST ================= */}
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
              <img src={project.image} alt={project.title} width="200" />
            )}

            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Project
                </a>
              </p>
            )}

            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </div>
        ))
      )}
    </section>
  );
}