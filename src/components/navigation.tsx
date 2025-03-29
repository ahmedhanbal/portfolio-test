"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { motion } from "framer-motion"
import { Home, Code2, Briefcase, BookOpen, Mail, Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home", id: "home", icon: Home },
  { name: "Background", href: "#background", id: "background", icon: Briefcase },
  { name: "Projects", href: "#projects", id: "projects", icon: Code2 },
  { name: "Blog", href: "#blog", id: "blog", icon: BookOpen },
  { name: "Contact", href: "#contact", id: "contact", icon: Mail },
]

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowMobileMenu(false);
  }

  return (
    <>
      {/* Desktop Navigation - Top Header */}
      <header className={cn(
        "sticky top-0 z-20 backdrop-blur-md bg-portfolio-secondary-bg/80 border-b border-portfolio-border py-4 px-6 rounded-t-md transition-all duration-300",
        isScrolling && "shadow-md"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-portfolio-accent"
            >
              Portfolio
            </motion.span>
          </div>

          {/* Desktop Navigation Menu - Shown on larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex gap-4 md:gap-6">
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

          {/* Mobile Navigation Menu Button - Only on small screens */}
          <div className="flex md:hidden gap-4 items-center">
            <ThemeToggle />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-portfolio-text-secondary hover:text-portfolio-accent p-1"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-3 border-t border-portfolio-border mt-4"
          >
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name} className="relative">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex items-center gap-2 w-full text-portfolio-text-secondary hover:text-portfolio-accent hover:bg-portfolio-card-bg p-2 rounded-md transition-colors duration-300",
                      activeSection === item.id && "text-portfolio-accent font-medium bg-portfolio-card-bg"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </header>

      {/* Mobile Bottom Navigation - Fixed at bottom for easy section switching */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-portfolio-secondary-bg/90 backdrop-blur-md border-t border-portfolio-border p-2 z-20">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md transition-colors w-16",
                activeSection === item.id 
                  ? "text-portfolio-accent bg-portfolio-card-bg" 
                  : "text-portfolio-text-secondary hover:text-portfolio-accent"
              )}
            >
              <item.icon size={18} />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navigation
