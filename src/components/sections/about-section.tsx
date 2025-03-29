"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Code2, Server, Database, Terminal,
  Cpu, Languages, Globe, HardDrive
} from "lucide-react"

interface AboutSectionProps {
  showSkillsOnly?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  }
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, skills, delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={delay}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-portfolio-accent/10 flex items-center justify-center text-portfolio-accent">
            {icon}
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-portfolio-secondary-bg hover:bg-portfolio-accent/10 border border-portfolio-border text-portfolio-text-secondary transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

const AboutSection: React.FC<AboutSectionProps> = ({ showSkillsOnly = false }) => {
  return (
    <section id={showSkillsOnly ? "skills" : "about"} className="space-y-16">
      {!showSkillsOnly && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <h2 className="text-2xl font-semibold mb-6">About Me</h2>
          <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
          <div className="space-y-4 text-portfolio-text-secondary max-w-3xl leading-relaxed">
            <p>
              I am Ahmed Ali Zahid, a CS Undergrad at NUCES, Islamabad. I am a passionate developer with expertise in C/C++, Java and Python.
            </p>
            <p>
              Currently focused on backend and network programming.
            </p>
            <p>
              I love tackling complex challenges and optimizing performance.
            </p>
          </div>
        </motion.div>
      )}

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
          <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <SkillCard
            title="Programming"
            icon={<Code2 className="w-5 h-5" />}
            skills={["C/C++", "Python", "Java", "JavaScript", "X86 Assembly"]}
            delay={0}
          />

          <SkillCard
            title="Web Development"
            icon={<Globe className="w-5 h-5" />}
            skills={["HTML5", "CSS3", "JavaScript"]}
            delay={1}
          />

          <SkillCard
            title="Databases"
            icon={<Database className="w-5 h-5" />}
            skills={["MS SQL Server", "MongoDB", "MS Access"]}
            delay={2}
          />

          <SkillCard
            title="Tools & DevOps"
            icon={<Terminal className="w-5 h-5" />}
            skills={["Git & GitHub", "Docker", "Gradle/CMake", "Linux/Unix"]}
            delay={3}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
