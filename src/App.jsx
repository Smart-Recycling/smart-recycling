/* eslint-disable no-unused-vars */

"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/home";
import NotFoundPage from "./pages/not_found";
import AboutPage from "./pages/about/about";
import BlogPage from "./pages/services/blog";
import ReportPage from "./pages/services/report";
import SignUpPage from "./pages/sign_up";

function App() {
  return (
    <div className="bg-bgGreen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}

          <Route path="/report" element={<ReportPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
