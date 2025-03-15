"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { motion } from "framer-motion"

const navItems = [
  { name: "Home", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Blog", href: "#blog", id: "blog" },
  { name: "Contact", href: "#contact", id: "contact" },
]

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-portfolio-secondary-bg/80 border-b border-portfolio-border py-4 px-6 rounded-t-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-portfolio-accent"
          >
            Ahmed.
          </motion.span>
        </div>

        <nav className="flex items-center space-x-8">
          <ul className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-portfolio-accent scrollbar-track-transparent">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "text-portfolio-text-secondary hover:text-portfolio-accent transition-colors duration-300 whitespace-nowrap text-sm md:text-base",
                    activeSection === item.id && "text-portfolio-accent font-medium"
                  )}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-portfolio-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Navigation
