import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Layout, Server, Palette } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code2 className="w-6 h-6" />,
      skills: ['C', 'Python', 'Java'],
      description: 'Core programming languages I use to build robust applications'
    },
    {
      title: 'Development Tools',
      icon: <Terminal className="w-6 h-6" />,
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Canva'],
      description: 'Essential tools that power my development workflow'
    },
    {
      title: 'Frontend Development',
      icon: <Layout className="w-6 h-6" />,
      skills: ['HTML', 'CSS'],
      description: 'Technologies I use to create beautiful user interfaces'
    },
    {
      title: 'Other Skills',
      icon: <Palette className="w-6 h-6" />,
      skills: ['Visual Design', 'Event Management', 'Audio Editing'],
      description: 'Additional expertise that complements my technical skills'
    },
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
      <div className="absolute inset-0 bg-gradient-radial from-gray-50/30 to-transparent dark:from-gray-900/10 dark:to-transparent" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group
                        border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600
                        transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded-full text-sm 
                                bg-gray-100 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300
                                border border-gray-200 dark:border-gray-600
                                hover:bg-gray-200 dark:hover:bg-gray-600
                                transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-gray-600 dark:text-gray-400"
        >
          <p className="text-sm">Continuously learning and expanding my skill set</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;