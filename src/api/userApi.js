import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/users`;

export async function getUsers() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

export async function createUser(user) {
  const token = getToken();
  console.log("USER CREATE TOKEN:", token);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

export async function updateUser(id, user) {
  const token = getToken();
  console.log("USER UPDATE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

export async function deleteUser(id) {
  const token = getToken();
  console.log("USER DELETE TOKEN:", token);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}