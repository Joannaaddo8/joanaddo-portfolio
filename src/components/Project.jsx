import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import "../styles/project.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Project() {
  const [projects, setProjects] = useState([]);

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

  return (
    <section className="projects">
      <header className="projects__header">
        <h2>My Projects</h2>
        <p>
          A selection of software and technical projects showcasing my experience
          in backend development, AI systems, APIs, and full-stack application design.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="projects-empty">No projects available yet.</p>
      ) : (
        projects.map((project) => (
          <article key={project.id} className="project-card">
            <h3>{project.title}</h3>

            {project.image && (
              <div className="project-card__gallery">
                <figure>
                  <img
                    src={`${BASE_URL}${project.image}`}
                    alt={project.title}
                    className="zoomable"
                  />
                </figure>
              </div>
            )}

            <p className="project-card__desc">{project.description}</p>

            {project.technologies && (
              <div className="project-card__tech">
                {project.technologies.split(",").map((tech, index) => (
                  <span key={index}>{tech.trim()}</span>
                ))}
              </div>
            )}

            <p>
              <strong>Completion:</strong>{" "}
              {project.completion
                ? new Date(project.completion).toLocaleDateString()
                : "N/A"}
            </p>

            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Project
                </a>
              </p>
            )}
          </article>
        ))
      )}
    </section>
  );
}