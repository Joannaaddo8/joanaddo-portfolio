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
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return await response.json();
}

export async function updateProject(id, project) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return await response.json();
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}