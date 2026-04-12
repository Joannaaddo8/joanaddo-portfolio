import { useState } from "react";
import ProjectCrud from "./ProjectCrud";
import ServicesCrud from "./ServicesCrud";
import UsersCrud from "./UsersCrud";
import ContactCrud from "./ContactCrud";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Manage your portfolio content from one place.</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>

        <button
          className={activeTab === "services" ? "active" : ""}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={activeTab === "contacts" ? "active" : ""}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-panel">
          {activeTab === "projects" && <ProjectCrud />}
          {activeTab === "services" && <ServicesCrud />}
          {activeTab === "contacts" && <ContactCrud />}
          {activeTab === "users" && <UsersCrud />}
        </div>
      </div>
    </section>
  );
}