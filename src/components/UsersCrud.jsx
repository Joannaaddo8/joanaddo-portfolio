import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

export default function UsersCrud() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    if (data.success) {
      setUsers(data.data);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      const result = await updateUser(editingId, formData);
      if (result.success) {
        resetForm();
        loadUsers();
      }
    } else {
      const result = await createUser(formData);
      if (result.success) {
        resetForm();
        loadUsers();
      }
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      password: user.password || "",
    });
  }

  async function handleDelete(id) {
    const result = await deleteUser(id);
    if (result.success) {
      loadUsers();
    }
  }

  function resetForm() {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    setEditingId(null);
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Manage Users</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <>
            {" "}
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          </>
        )}
      </form>

      <h3>User List</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h4>
              {user.firstname} {user.lastname}
            </h4>
            <p><strong>Email:</strong> {user.email}</p>

            <button onClick={() => handleEdit(user)}>Edit</button>{" "}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))
      )}
    </section>
  );
}