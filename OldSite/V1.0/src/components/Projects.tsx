import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Layers, Globe, Shield, Palette, Lock } from 'lucide-react';

const Projects = () => {
  const mainProjects = [
    {
      title: "Borderless Safety",
      description: "A real-time travel intelligence platform offering legal, cultural, and health/safety insights for international travelers. Features upcoming AI assistant integration.",
      technologies: ["React", "Node.js", "AI Integration"],
      link: "https://chintu1308.github.io/BorderlessSafety/",
      github: "https://github.com/Chintu1308/Borderless-Safety",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-green-500"
    },
    {
      title: "PulseView – Chrome Extension",
      description: "A real-time network monitoring Chrome extension ideal for debugging under high-traffic conditions.",
      technologies: ["JavaScript", "Chrome API", "Network Monitoring"],
      github: "https://github.com/thebharat07/PulseView",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Lost & Found Campus Portal",
      description: "A platform for reporting and recovering lost items on university campuses with smart search and email notifications.",
      technologies: ["React", "Node.js", "Email Integration"],
      link: "https://lost-found-sooty.vercel.app/",
      github: "https://github.com/Chintu1308/lost-found-campus-portal",
      icon: <Shield className="w-8 h-8" />,
      color: "from-amber-500 to-red-500"
    }
  ];

  const miniProjects = [
    {
      title: "Color Regulator",
      description: "Interactive color manipulation tool with real-time preview",
      technologies: ["React", "Color Theory"],
      link: "https://chintu1308.github.io/colours-regulator/",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Password Strength Checker",
      description: "Advanced password security analysis tool",
      technologies: ["JavaScript", "Security"],
      link: "#",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "NoteBook",
      description: "A special notepad for students to take notes and save them in a database",
      technologies: ["HTML", "CSS"],
      link: "https://chintu1308.github.io/NoteBook/",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/30 to-transparent dark:from-blue-900/10 dark:to-transparent" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative"
      >
        <h2 className="text-4xl font-bold text-center text-gradient mb-16">
          Featured Projects
        </h2>
        
        {/* Main Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl p-6 backdrop-blur-lg relative overflow-hidden group"
            >
              {/* Project icon with gradient background */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              <div className="relative">
                <div className="mb-4">{project.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Projects */}
        <div className="mt-20">
          <h3 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-12">
            Mini Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-6 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/50">
                    {project.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 text-xs rounded-full bg-blue-50/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Project <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;