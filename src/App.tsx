import React, { useState, useEffect } from 'react';
import { Menu, User, Award, Laptop as LaptopCode, BookOpen, Contact2 } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id') || '';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'about', icon: <User size={20} />, label: 'About' },
    { id: 'projects', icon: <LaptopCode size={20} />, label: 'Projects' },
    { id: 'experience', icon: <Award size={20} />, label: 'Experience' },
    { id: 'blogs', icon: <BookOpen size={20} />, label: 'Blogs', isExternal: true },
    { id: 'contact', icon: <Contact2 size={20} />, label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 transition-colors duration-300">
      <nav className="fixed w-full backdrop-blur-md bg-gray-900/80 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gradient">
                Hari Hara Charan
              </h1>
            </div>
            
            <div className="hidden md:flex items-center">
              <ul className="flex space-x-1">
                {navItems.map((item) => (
                  <li key={item.id} className="navbar-icon group">
                    {item.isExternal ? (
                      <a
                        href="/blogs"
                        className="flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <span className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                          {item.icon}
                        </span>
                        <span className="ml-2 text-gray-300 group-hover:text-blue-400 transition-colors duration-200">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-800/50 transition-all duration-200 ${
                          activeSection === item.id ? 'bg-gray-800/30' : ''
                        }`}
                      >
                        <span className={`${
                          activeSection === item.id ? 'text-blue-400' : 'text-gray-400'
                        } group-hover:text-blue-400 transition-colors duration-200`}>
                          {item.icon}
                        </span>
                        <span className={`ml-2 ${
                          activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                        } group-hover:text-blue-400 transition-colors duration-200`}>
                          {item.label}
                        </span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="bg-gray-900/90 backdrop-blur-md shadow-lg">
            <ul className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.isExternal ? (
                    <a
                      href="/blogs"
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <span className="text-gray-400">{item.icon}</span>
                      <span className="ml-2 text-gray-300">{item.label}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 ${
                        activeSection === item.id ? 'bg-gray-800/30' : ''
                      }`}
                    >
                      <span className={`${
                        activeSection === item.id ? 'text-blue-400' : 'text-gray-400'
                      }`}>
                        {item.icon}
                      </span>
                      <span className={`ml-2 ${
                        activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section id="hero" className="relative">
          <Hero />
        </section>

        <section id="about" className="relative py-20 bg-gray-900/50">
          <About />
        </section>

        <section id="projects" className="relative py-20 bg-gray-950/50">
          <Projects />
        </section>

        <section id="skills" className="relative py-20 bg-gray-900/50">
          <Skills />
        </section>

        <section id="experience" className="relative py-20 bg-gray-950/50">
          <Experience />
        </section>

        <section id="certifications" className="relative py-20 bg-gray-900/50">
          <Certifications />
        </section>

        <section id="education" className="relative py-20 bg-gray-950/50">
          <Education />
        </section>

        <section id="contact" className="relative py-20 bg-gray-900/50">
          <Contact />
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2024 Hari Hara Charan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;