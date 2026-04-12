import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api/userApi";
import "../styles/users.css";

export default function UsersCrud() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    if (data.success) {
      setUsers(data.data);
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const result = await updateUser(editingId, formData);
    if (result.success) {
      resetForm();
      loadUsers();
    }
  }

  async function handleDelete(id) {
    const result = await deleteUser(id);
    if (result.success) {
      loadUsers();
    }
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
    });
  }

  return (
    <section className="users-admin-page">
      <h2>User Management</h2>
      <p className="users-admin-subtext">
        Registered users are managed here. New users should sign up through the register page.
      </p>

      {editingId && (
        <form onSubmit={handleUpdate} className="users-admin-form">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="users-admin-actions">
            <button type="submit">Update User</button>
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="users-admin-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <article key={user.id} className="users-admin-card">
              <h3>
                {user.firstname} {user.lastname}
              </h3>
              <p><strong>Email:</strong> {user.email}</p>

              <div className="users-admin-actions">
                <button type="button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}