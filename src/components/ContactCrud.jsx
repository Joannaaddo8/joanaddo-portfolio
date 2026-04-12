import { useEffect, useState } from "react";
import { getReferences, deleteReference } from "../api/referenceApi";
import "../styles/contact.css";

export default function ContactAdmin() {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    loadReferences();
  }, []);

  async function loadReferences() {
    try {
      const data = await getReferences();
      console.log("GET REFERENCES:", data);

      if (data.success) {
        setReferences(data.data);
      }
    } catch (err) {
      console.error("Error loading references:", err);
    }
  }

  async function handleDelete(id) {
    try {
      const result = await deleteReference(id);
      console.log("REFERENCE DELETE RESPONSE:", result);

      if (result.success) {
        loadReferences();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  return (
    <section className="contact-admin">
      <div className="contact-admin__header">
        <h2>Manage Contacts</h2>
        <p>
          View and manage submitted contact entries from the public contact page.
        </p>
      </div>

      <div className="contact-admin__list">
        {references.length === 0 ? (
          <p className="contact-admin__empty">No contact entries yet.</p>
        ) : (
          references.map((reference) => (
            <article key={reference.id} className="contact-admin__card">
              <h3>
                {reference.firstName} {reference.lastName}
              </h3>

              <p>
                <strong>Email:</strong> {reference.email}
              </p>

              {reference.phone && (
                <p>
                  <strong>Phone:</strong> {reference.phone}
                </p>
              )}

              <div className="contact-admin__message">
                <strong>Message:</strong>
                <p>{reference.message}</p>
              </div>

              <div className="contact-admin__actions">
                <button
                  type="button"
                  className="contact-admin__delete"
                  onClick={() => handleDelete(reference.id)}
                >
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