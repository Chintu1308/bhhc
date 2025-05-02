import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Target, Award, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Joint Secretary",
      organization: "GCCC",
      period: "2023 - Present",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      responsibilities: [
        "Led cultural initiatives and event planning",
        "Managed team coordination and resource allocation",
        "Developed promotional content and marketing strategies",
        "Organized hands-on learning experiences for peers"
      ]
    },
    {
      title: "Technical Team Member",
      organization: "GCCC",
      period: "2022 - 2023",
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      responsibilities: [
        "Handled event logistics and technical requirements",
        "Created and produced creative media content",
        "Supported team operations and project execution",
        "Collaborated on technical documentation"
      ]
    },
    {
      title: "Supporting Member",
      organization: "AsCI",
      period: "2022 - Present",
      icon: <Award className="w-6 h-6" />,
      color: "from-amber-500 to-red-500",
      responsibilities: [
        "Organized cybersecurity awareness events",
        "Contributed to R&D initiatives",
        "Facilitated AI seminars and workshops",
        "Engaged in community outreach programs"
      ]
    },
    {
      title: "Chronicle Editor",
      organization: "College Chronicle",
      period: "2022 - Present",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      responsibilities: [
        "Managed editorial content and publication workflow",
        "Conducted campus journalism activities",
        "Coordinated with writers and contributors",
        "Maintained editorial standards and quality"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent" />
      
      <div className="relative">
        <h2 className="text-4xl font-bold text-center text-gradient mb-16">
          Experience & Leadership
        </h2>

        <div className="relative">
          {/* Main root stem */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 glow">
            {/* Animated particles flowing down */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-300"
                animate={{
                  y: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Experience items with branching roots */}
          <div className="relative ml-4 md:ml-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-start gap-8 mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${index % 2 === 0 ? 'md:mr-[50%]' : 'md:ml-[50%]'}`}
              >
                {/* Root branch */}
                <div className={`absolute top-8 ${
                  index % 2 === 0 ? 'right-0 md:left-auto' : 'left-0 md:right-auto'
                } w-24 h-px bg-gradient-to-r ${
                  index % 2 === 0 
                    ? 'from-blue-400 to-transparent' 
                    : 'from-transparent to-blue-400'
                } glow`}>
                  {/* Branch particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 w-1 h-1 rounded-full bg-blue-300"
                      animate={{
                        x: index % 2 === 0 ? ["0%", "100%"] : ["100%", "0%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>

                {/* Content card */}
                <div className="glass rounded-xl p-6 backdrop-blur-lg relative overflow-hidden group flex-1">
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-gray-800/50 text-blue-400">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-100">
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-medium">
                          {exp.organization}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <motion.div
                          key={respIndex}
                          className="flex items-start space-x-2 text-gray-300"
                          whileHover={{ x: 5 }}
                        >
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-400" />
                          <span>{resp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 10px #60A5FA,
                      0 0 20px #60A5FA,
                      0 0 30px #60A5FA;
        }
      `}</style>
    </div>
  );
};

export default Experience;