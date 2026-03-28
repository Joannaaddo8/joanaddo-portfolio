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
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  return await response.json();
}

export async function updateService(id, service) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  return await response.json();
}

export async function deleteService(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}