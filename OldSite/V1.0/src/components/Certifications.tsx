import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import CertificateModal from './CertificateModal';

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const certifications = [
    {
      title: "Cybersecurity Virtual Internship",
      issuer: "Palo Alto Networks",
      date: "March 2025",
      skills: "AI in Security",
      color: "from-indigo-500 to-violet-500",
      certificateUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306038253470593025?collapsed=1"
    },
    {
      title: "ML for Cybersecurity Bootcamp",
      issuer: "PSSDC / C-DAC",
      date: "February 2025",
      skills: "AI in Security",
      color: "from-indigo-500 to-violet-500",
      certificateUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7297683556078628864?collapsed=1"
    },
    {
      title: "C++ Programming: Basic Skills",
      issuer: "edX",
      date: "June 2024",
      skills: "C++",
      color: "from-blue-500 to-cyan-500",
      certificateUrl: "https://courses.edx.org/certificates/cfa5cb0b8dd34f8e838fff775798db20"
    },
    {
      title: "Cybersecurity Basics",
      issuer: "edX",
      date: "June 2024",
      skills: "Cybersecurity",
      color: "from-purple-500 to-pink-500",
      certificateUrl: "https://courses.edx.org/certificates/0e204ee439cb4a008cc63eacd9a6ccc8"
    },
    {
      title: "Python for Data Science",
      issuer: "edX",
      date: "June 2024",
      skills: "Python, Data Structures",
      color: "from-green-500 to-emerald-500",
      certificateUrl: "https://courses.edx.org/certificates/572471ba52e94cfca8adf9eaa1215d32"
    },
    {
      title: "Intro to Cybersecurity",
      issuer: "Cisco",
      date: "April 2024",
      skills: "Cybersecurity",
      color: "from-orange-500 to-red-500",
      certificateUrl: "https://www.credly.com/badges/93e50c86-c24c-4a07-85c0-3e43d86f86d1/linked_in_profile"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const handleCertificateClick = (url: string) => {
    if (url.includes('linkedin.com')) {
      setSelectedCertificate(url);
    } else {
      window.open(url, '_blank');
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
          Professional Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl p-6 backdrop-blur-lg relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-gray-800/50">
                    <Award className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {cert.date}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-100 mb-2 line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center mb-4 text-gray-300">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{cert.issuer}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.split(', ').map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-sm rounded-full bg-gray-800/50 text-gray-300 border border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleCertificateClick(cert.certificateUrl)}
                  className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 group-hover:underline"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    View Certificate
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </button>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Continuously expanding knowledge through professional certifications
          </p>
        </motion.div>
      </motion.div>

      {selectedCertificate && (
        <CertificateModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          certificateUrl={selectedCertificate}
        />
      )}
    </div>
  );
};

export default Certifications;