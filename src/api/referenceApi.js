const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/references`;

export async function getReferences() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getReferenceById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

export async function createReference(reference) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reference),
  });
  return await response.json();
}

export async function updateReference(id, reference) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reference),
  });
  return await response.json();
}

export async function deleteReference(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}