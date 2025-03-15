"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import EducationSection from "@/components/sections/education-section"
import BlogSection from "@/components/sections/blog-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import { AnimatePresence, motion } from "framer-motion"

const MainContent = () => {
  const [activeSection, setActiveSection] = useState("about")

  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AboutSection showSkillsOnly />
          </motion.div>
        )
      case "education":
        return (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EducationSection />
          </motion.div>
        )
      case "projects":
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectsSection />
          </motion.div>
        )
      case "blog":
        return (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BlogSection />
          </motion.div>
        )
      case "contact":
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ContactSection />
          </motion.div>
        )
      case "about":
      default:
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AboutSection />
          </motion.div>
        )
    }
  }

  return (
    <div className="flex-1 p-4">
      <Card className="bg-portfolio-secondary-bg border-portfolio-border min-h-[calc(100vh-2rem)] overflow-hidden backdrop-blur-md bg-portfolio-secondary-bg/80">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="p-6">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  )
}

export default MainContent
