import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 animate-gradient"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full"
            initial={{ x: Math.random() * 100, y: Math.random() * 100 }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-gradient mb-6"
        >
          Hi, I'm Hari Hara Charan
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
        >
          Computer Science Undergraduate | Tech Community Contributor
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-8"
        >
          {[
            { Icon: Github, href: "https://github.com/Chintu1308" },
            { Icon: Linkedin, href: "https://linkedin.com/in/bhhc" },
            { Icon: Mail, href: "mailto:bhhc1308@gmail.com" },
            { Icon: BookOpen, href: "/blogs" }
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-500 flex justify-center items-start p-1">
              <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;