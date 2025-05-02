import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, School } from 'lucide-react';

const Education = () => {
  const education = [
    {
      school: "Gayatri Vidya Parishad College of Engineering (Autonomous)",
      degree: "Bachelor of Technology - BTech, Computer Science",
      period: "Sep 2023 - 2027",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Pursuing B.Tech in Computer Science",
        "Focusing on cutting-edge technologies",
        "Active participation in technical events",
        "Exploring various domains in CS"
      ]
    },
    {
      school: "SRI VISWA",
      degree: "Intermediate Education",
      period: "2021 - 2023",
      icon: <Award className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Completed intermediate education",
        "Strong foundation in sciences",
        "Participated in academic competitions",
        "Developed analytical skills"
      ]
    },
    {
      school: "Dr.K.K.R's Gowtham School",
      degree: "Secondary Education",
      period: "2015 - 2021",
      grade: "5th std to 10th std",
      icon: <School className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Completed secondary education",
        "Active in extracurricular activities",
        "Developed leadership skills",
        "Excellence in academics"
      ]
    },
    {
      school: "Lakshmipat Singhania Public School",
      degree: "Primary Education",
      period: "2009 - 2015",
      grade: "Play school to 4th std",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-amber-500 to-red-500",
      highlights: [
        "Early education foundation",
        "Participated in school activities",
        "Developed creative skills",
        "Active in sports and arts"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <h2 className="text-4xl font-bold text-center text-gradient mb-16">
          Educational Journey
        </h2>

        <div className="space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connecting line */}
              {index < education.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5">
                  <div className="h-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-30" />
                  {/* Animated dots */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 left-[-2px] bg-blue-400 rounded-full"
                      animate={{
                        y: ["0%", "100%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Education card */}
              <div className="glass rounded-xl p-8 backdrop-blur-lg relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-lg bg-gray-800/50 text-blue-400">
                      {edu.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-100 mb-1">
                            {edu.school}
                          </h3>
                          <p className="text-blue-400 font-medium">
                            {edu.degree}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                      </div>

                      {edu.grade && (
                        <p className="text-gray-400 mt-2">
                          Grade: {edu.grade}
                        </p>
                      )}

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {edu.highlights.map((highlight, highlightIndex) => (
                          <motion.div
                            key={highlightIndex}
                            className="flex items-center space-x-2 text-gray-300"
                            whileHover={{ x: 5 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span>{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Education;