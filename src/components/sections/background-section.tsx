"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Code2, Server, Database, Terminal,
  Cpu, Languages, Globe, HardDrive,
  GraduationCap, School, BookOpen, Calendar
} from "lucide-react"

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

interface EducationItemProps {
  title: string
  period: string
  institutions: string[]
  icon: React.ReactNode
  index: number
}

const EducationItem: React.FC<EducationItemProps> = ({ title, period, institutions, icon, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-portfolio-accent/5 rounded-bl-full -mr-12 -mt-12 z-0"></div>

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-lg bg-portfolio-accent/10 flex items-center justify-center text-portfolio-accent flex-shrink-0 mt-1">
            {icon}
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-medium mb-1">{title}</h3>
              <div className="flex items-center text-portfolio-text-secondary text-sm gap-2 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{period}</span>
              </div>
            </div>

            <div>
              <Badge variant="outline" className="bg-portfolio-secondary-bg mb-3">Institution{institutions.length > 1 ? 's' : ''}</Badge>
              <ul className="space-y-2 text-portfolio-text-secondary">
                {institutions.map((institution, idx) => (
                  <li key={idx} className="text-sm leading-relaxed">
                    {institution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const BackgroundSection = () => {
  const educationData = [
    {
      title: "BS Computer Science",
      period: "2022-Present",
      institutions: ["FAST NUCES, Islamabad"],
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: "HSSC (Higher Secondary School Certificate)",
      period: "2020-2022",
      institutions: ["FG Degree College for Men Wah Cantt (HSSC-I & HSSC-II)"],
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "SSC (Secondary School Certificate)",
      period: "2018-2020",
      institutions: [
        "FG Public School Gujranwala Cantt (SSC-I)",
        "FG Fazaia Public School (2nd Shift) PAF BASE FAISAL Karachi (SSC-II)"
      ],
      icon: <School className="w-6 h-6" />
    }
  ]

  return (
    <section id="background" className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Background</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-6">Education</h3>
          </motion.div>

          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {educationData.map((item, index) => (
              <EducationItem
                key={index}
                title={item.title}
                period={item.period}
                institutions={item.institutions}
                icon={item.icon}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-6">Skills</h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
      </div>
    </section>
  )
}

export default BackgroundSection 