import { useEffect, useState } from "react";
import "../styles/project.css";

/* ===================== Currency Converter Images ===================== */
import converterInitial from "../assets/projects/converterInitial.png";
import converterAfter from "../assets/projects/converterAfter.png";
import converterData from "../assets/projects/converterData.png";

/* ===================== MediBook Images ===================== */
import medibookUsecase from "../assets/projects/medibook_usecase.png";
import medibookClassdiagram from "../assets/projects/medibook_classdiagram.png";

/* ===================== Swim Management Images ===================== */
import swimMeetCreate from "../assets/projects/swim-meet-create.png";
import swimEventLoaded from "../assets/projects/swim-event-loaded.png";
import swimEntryAdd from "../assets/projects/swim-entry-add.png";
import swimHeatSheet from "../assets/projects/swim-heat-sheet.png";

/* ===================== Lightbox Component ===================== */
function Lightbox({ open, src, alt, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // stop page scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img className="lightbox__img" src={src} alt={alt} />
        <p className="lightbox__caption">{alt}</p>
      </div>
    </div>
  );
}

export default function Project() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  function openLightbox(src, alt) {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxSrc("");
    setLightboxAlt("");
  }

  return (
    <section className="projects">
      <header className="projects__header">
        <h2>My Projects</h2>
        <p>
          Selected projects that demonstrate my skills in software development,
          requirements documentation, and building working applications.
        </p>
      </header>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
      />

      {/* ===================== Currency Converter ===================== */}
      <article className="project-card">
        <h3>Currency Converter (Python Desktop Application)</h3>

        <p className="project-card__tech">
          <span>Python</span>
          <span>Tkinter</span>
          <span>REST API</span>
          <span>Input Validation</span>
        </p>

        <p className="project-card__desc">
          A desktop currency converter that supports multiple currencies,
          validates user input, and stores conversion history for review.
        </p>

        <ul className="project-card__bullets">
          <li>
            <strong>My role:</strong> Designed the GUI layout, implemented
            conversion logic, input validation, and a conversion history table.
          </li>
          <li>
            <strong>Outcome:</strong> Users can convert amounts, clear inputs,
            and view previously converted records in a structured table.
          </li>
        </ul>

        <div className="project-card__gallery">
          <figure>
            <img
              src={converterInitial}
              alt="Currency Converter application main screen"
              className="zoomable"
              onClick={() =>
                openLightbox(
                  converterInitial,
                  "Currency Converter application main screen"
                )
              }
            />
            <figcaption>Main interface</figcaption>
          </figure>

          <figure>
            <img
              src={converterAfter}
              alt="Currency Converter showing conversion result"
              className="zoomable"
              onClick={() =>
                openLightbox(
                  converterAfter,
                  "Currency Converter showing conversion result"
                )
              }
            />
            <figcaption>Conversion result</figcaption>
          </figure>

          <figure>
            <img
              src={converterData}
              alt="Currency Converter conversion history table"
              className="zoomable"
              onClick={() =>
                openLightbox(
                  converterData,
                  "Currency Converter conversion history table"
                )
              }
            />
            <figcaption>Saved conversion history</figcaption>
          </figure>
        </div>
      </article>

      {/* ===================== MediBook SRS ===================== */}
      <article className="project-card">
        <h3>MediBook – Clinic Appointment System (SRS & UML Design)</h3>

        <p className="project-card__tech">
          <span>Software Requirements</span>
          <span>UML</span>
          <span>Use Cases</span>
          <span>Domain Class Model</span>
          <span>Agile</span>
          <span>Traceability</span>
        </p>

        <p className="project-card__desc">
          MediBook is a clinic appointment scheduling system designed to replace
          manual booking processes. The system supports patients, doctors, and
          clinic staff through structured requirements and UML-based design.
        </p>

        <ul className="project-card__bullets">
          <li>
            <strong>My contribution:</strong> Created goal-oriented use cases
            linked to requirement IDs, authored a formal “Book Appointment”
            use-case specification, applied the noun technique to identify domain
            classes, and documented key relationships and responsibilities.
          </li>
          <li>
            <strong>Outcome:</strong> Delivered clear, traceable SRS artifacts
            and UML models that support development, testing, and future system
            implementation.
          </li>
        </ul>

        <div className="project-card__gallery project-card__gallery--two">
          <figure>
            <img
              src={medibookUsecase}
              alt="MediBook use case diagram"
              className="zoomable"
              onClick={() =>
                openLightbox(medibookUsecase, "MediBook use case diagram")
              }
            />
            <figcaption>Use case diagram</figcaption>
          </figure>

          <figure>
            <img
              src={medibookClassdiagram}
              alt="MediBook domain class diagram"
              className="zoomable"
              onClick={() =>
                openLightbox(
                  medibookClassdiagram,
                  "MediBook domain class diagram"
                )
              }
            />
            <figcaption>Domain class diagram</figcaption>
          </figure>
        </div>
      </article>

      {/* ===================== Swim Management System ===================== */}
      <article className="project-card">
        <h3>Swimming Management System (C# WinForms)</h3>

        <p className="project-card__tech">
          <span>C#</span>
          <span>.NET WinForms</span>
          <span>Object-Oriented Design</span>
          <span>Desktop Application</span>
        </p>

        <p className="project-card__desc">
          A desktop application designed to help swim meet organizers create
          meets, manage swim events, register swimmers, and generate formatted
          heat sheets. The core workflows and business logic are implemented,
          while the frontend UI is still being refined.
        </p>

        <ul className="project-card__bullets">
          <li>
            <strong>My role:</strong> Designed and implemented the complete core
            class library responsible for swim meet setup, event management,
            swimmer entries, and heat sheet generation logic. I also developed
            approximately 60% of the WinForms user interface, focusing on the
            primary user workflows.
          </li>
          <li>
            <strong>Status:</strong> In progress — backend logic and core
            workflows are complete; frontend layout, visual polish, and event
            modification behavior are still being refined.
          </li>
        </ul>

        <div className="project-card__gallery">
          <figure>
            <img
              src={swimMeetCreate}
              alt="Create swim meet screen"
              className="zoomable"
              onClick={() => openLightbox(swimMeetCreate, "Create swim meet screen")}
            />
            <figcaption>Create swim meet</figcaption>
          </figure>

          <figure>
            <img
              src={swimEventLoaded}
              alt="Swim events loaded in grid"
              className="zoomable"
              onClick={() => openLightbox(swimEventLoaded, "Swim events loaded in grid")}
            />
            <figcaption>Manage swim events</figcaption>
          </figure>

          <figure>
            <img
              src={swimEntryAdd}
              alt="Add swimmer entry form"
              className="zoomable"
              onClick={() => openLightbox(swimEntryAdd, "Add swimmer entry form")}
            />
            <figcaption>Add swimmer entry</figcaption>
          </figure>

          <figure>
            <img
              src={swimHeatSheet}
              alt="Generated swim heat sheet"
              className="zoomable"
              onClick={() => openLightbox(swimHeatSheet, "Generated swim heat sheet")}
            />
            <figcaption>Generate heat sheet</figcaption>
          </figure>
        </div>
      </article>
    </section>
  );
}
