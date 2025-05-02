import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Shield, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code2 size={24} />,
      title: "Software Development",
      description: "Passionate about building impactful solutions using modern technologies"
    },
    {
      icon: <Shield size={24} />,
      title: "Cybersecurity",
      description: "Focused on digital forensics and securing web applications"
    },
    {
      icon: <Users size={24} />,
      title: "Community Leadership",
      description: "Leading technical communities and organizing learning initiatives"
    },
    {
      icon: <Globe size={24} />,
      title: "Global Impact",
      description: "Creating solutions that make a difference worldwide"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <h2 className="text-4xl font-bold text-center text-gradient mb-16">
          About Me
        </h2>

        {/* Main content with glass effect */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 backdrop-blur-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm Bongu Hari Hara Charan, a Computer Science undergraduate with a passion for creating innovative solutions that make a real difference in people's lives.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                From developing travel safety platforms to performance monitoring tools, I focus on building practical applications that solve real-world challenges.
              </p>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass rounded-2xl p-8 backdrop-blur-lg"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Beyond web development, I have a deep interest in cybersecurity particularly cyber forensics. My involvement in workshops, events like Catch the Phish, and various certifications reflects my commitment to digital security and trust.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;