import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, MessageCircle, Instagram } from 'lucide-react';

const Contact = () => {
  const contactLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      href: "mailto:bhhc1308@gmail.com",
      username: "bhhc1308@gmail.com",
      color: "from-violet-600 to-violet-800"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/Chintu1308",
      username: "Chintu1308",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/bhhc",
      username: "bhhc",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "LinkTree",
      href: "https://linktr.ee/bhhc1308",
      username: "bhhc1308",
      color: "from-green-600 to-green-800"
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
      opacity: 1
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative"
      >
        <h2 className="text-4xl font-bold text-center text-gradient mb-16">
          Keep in Touch
        </h2>

        <div className="max-w-2xl mx-auto">
          {/* Main contact message */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-8 backdrop-blur-lg relative overflow-hidden group mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6">
                <MessageCircle className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                Let's Connect!
              </h3>
              <p className="text-gray-300">
                I'm always excited to collaborate on innovative projects and discuss new opportunities. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  x: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`
                  ],
                  y: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`
                  ],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>

          {/* Contact links */}
          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass rounded-xl p-6 backdrop-blur-lg relative overflow-hidden group block"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative flex items-center">
                  <div className="p-3 rounded-lg bg-gray-800/50 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <span className="block text-lg font-medium text-gray-100">
                      {link.label}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {link.username}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Available for freelance opportunities and collaborations
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;