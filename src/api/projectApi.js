import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/projects`;

export async function getProjects() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getProjectById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

export async function createProject(project) {
  const token = getToken();
  console.log("PROJECT CREATE TOKEN:", token);

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("completion", project.completion);
  formData.append("description", project.description);
  formData.append("technologies", project.technologies || "");
  formData.append("link", project.link || "");

  if (project.image) {
    formData.append("image", project.image);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
}

export async function updateProject(id, project) {
  const token = getToken();
  console.log("PROJECT UPDATE TOKEN:", token);

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("completion", project.completion);
  formData.append("description", project.description);
  formData.append("technologies", project.technologies || "");
  formData.append("link", project.link || "");

  if (project.image) {
    formData.append("image", project.image);
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
}

export async function deleteProject(id) {
  const token = getToken();
  console.log("PROJECT DELETE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}