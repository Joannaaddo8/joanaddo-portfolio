import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import ProjectCrud from "./components/ProjectCrud";
import ServicesCrud from "./components/ServicesCrud";
import Contact from "./components/Contact";
import UsersCrud from "./components/UsersCrud";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="project" element={<ProjectCrud />} />
          <Route path="services" element={<ServicesCrud />} />
          <Route path="contact" element={<Contact />} />
          <Route path="users" element={<UsersCrud />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
