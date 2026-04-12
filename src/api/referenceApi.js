import { getToken } from "../utils/auth";

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
  const token = getToken();
  console.log("REFERENCE CREATE TOKEN:", token);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reference),
  });

  return await response.json();
}

export async function updateReference(id, reference) {
  const token = getToken();
  console.log("REFERENCE UPDATE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reference),
  });

  return await response.json();
}

export async function deleteReference(id) {
  const token = getToken();
  console.log("REFERENCE DELETE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}