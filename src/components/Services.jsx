import { useEffect, useState } from "react";
import { getServices } from "../api/serviceApi";
import "../styles/services.css";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const res = await getServices();
      if (res.success) {
        setServices(res.data);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    }
  }

  return (
    <section className="services-page">
      <header className="services-page__header">
        <h2>My Services</h2>
        <p>
          A selection of services I offer across software development,
          technical problem-solving, and digital solution building.
        </p>
      </header>

      {services.length === 0 ? (
        <p className="services-page__empty">No services available yet.</p>
      ) : (
        <div className="services-page__grid">
          {services.map((service) => (
            <article key={service.id} className="services-page__card">
              <h3>{service.title}</h3>

              {service.price !== undefined && service.price !== "" && (
                <p className="services-page__price">${service.price}</p>
              )}

              <p>{service.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}