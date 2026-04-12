import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/services`;

export async function getServices() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getServiceById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

export async function createService(service) {
  const token = getToken();
  console.log("SERVICE CREATE TOKEN:", token);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
  });

  return await response.json();
}

export async function updateService(id, service) {
  const token = getToken();
  console.log("SERVICE UPDATE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
  });

  return await response.json();
}

export async function deleteService(id) {
  const token = getToken();
  console.log("SERVICE DELETE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}