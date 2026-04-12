import { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../api/serviceApi";
import "../styles/services.css";

export default function ServicesCrud() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const data = await getServices();
    if (data.success) {
      setServices(data.data);
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
      const result = await updateService(editingId, formData);
      if (result.success) {
        resetForm();
        loadServices();
      }
    } else {
      const result = await createService(formData);
      if (result.success) {
        resetForm();
        loadServices();
      }
    }
  }

  function handleEdit(service) {
    setEditingId(service.id);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const result = await deleteService(id);
    if (result.success) {
      loadServices();
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      price: "",
    });
    setEditingId(null);
  }

  return (
    <section className="services-admin-page">
      <h2>Service Management</h2>

      <form onSubmit={handleSubmit} className="services-admin-form">
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <div className="services-admin-actions">
          <button type="submit" className="service-btn">
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              className="service-btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        services.map((service) => (
          <article key={service.id} className="service-card">
            <h3>{service.title}</h3>

            {service.price !== undefined && service.price !== "" && (
              <p className="service-price">${service.price}</p>
            )}

            <p>{service.description}</p>

            <div className="service-card-actions">
              <button
                type="button"
                className="service-btn-secondary"
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>
              <button
                type="button"
                className="service-btn-danger"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}