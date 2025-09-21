import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import QuickInquiry from './components/QuickInquiry';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/admin/AdminPanel';
import FloatingActions from './components/FloatingActions';
import InquiryModal from './components/InquiryModal';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import { projectService } from './services/projectService';

function App() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Projects />
      <Testimonials />
      <QuickInquiry />
   
      <Footer />
      <FloatingActions onInquiryClick={() => setShowInquiryModal(true)} />
      <InquiryModal 
        isOpen={showInquiryModal} 
        onClose={() => setShowInquiryModal(false)} 
      />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blogs" element={<><Header /><Blogs /><Footer /></>} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;