"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, School, BookOpen, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface EducationItemProps {
  title: string
  period: string
  institutions: string[]
  icon: React.ReactNode
  index: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
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

const EducationSection = () => {
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
    <section id="education" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
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
    </section>
  )
}

export default EducationSection
