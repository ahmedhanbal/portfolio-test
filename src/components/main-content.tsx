"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import HomeSection from "@/components/sections/home-section"
import BackgroundSection from "@/components/sections/background-section"
import ProjectsSection from "@/components/sections/projects-section"
import BlogSection from "@/components/sections/blog-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import { AnimatePresence, motion } from "framer-motion"

const MainContent = () => {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "background":
        return (
          <motion.div
            key="background"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BackgroundSection />
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
      case "home":
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <HomeSection />
          </motion.div>
        )
    }
  }

  return (
    <div className="flex-1 p-2 sm:p-4">
      <Card className="bg-portfolio-secondary-bg border-portfolio-border min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] overflow-hidden backdrop-blur-md bg-portfolio-secondary-bg/80">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="p-3 sm:p-6 pb-20 md:pb-6">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  )
}

export default MainContent
