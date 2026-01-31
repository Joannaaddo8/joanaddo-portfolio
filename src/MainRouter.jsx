import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Services from "./components/Services";
import Contact from "./components/Contact";

export default function MainRouter() {
  return (
    <>
      <Layout />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* catches wrong URLs */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
