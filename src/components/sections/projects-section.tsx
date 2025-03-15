"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  projectUrl: string
  delay?: number
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
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, projectUrl, delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={delay}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="group bg-portfolio-card-bg border-portfolio-border overflow-hidden p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
        <div className="project-content h-full flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium group-hover:text-portfolio-accent transition-colors duration-300">{title}</h3>
            <Link
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary hover:text-portfolio-accent transition-colors p-2 rounded-full hover:bg-portfolio-accent/10"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-portfolio-text-secondary mb-4 flex-grow">{description}</p>

          <Link
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-accent hover:text-portfolio-accent/80 text-sm font-medium flex items-center gap-2 mt-auto w-fit"
          >
            <span>View Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

const categories = [
  "All",
  "C/C++",
  "Games",
  "Other"
]

const projects = [
  {
    id: 1,
    title: "BitTorrent Client",
    description: "A BitTorrent CLI client implemented in C++, featuring peer-to-peer file sharing.",
    projectUrl: "https://github.com/ahmedhanbal/bittorrent-client-cpp",
    categories: ["All", "C/C++"]
  },
  {
    id: 2,
    title: "Tetris",
    description: "A modern implementation of the classic Tetris game using C++ and SFML.",
    projectUrl: "https://github.com/ahmedhanbal/TetrisPF",
    categories: ["All", "C/C++", "Games"]
  },
  {
    id: 3,
    title: "Space Shooter",
    description: "A retro-style space shooter game built with C++ and SFML, incorporating object-oriented design patterns.",
    projectUrl: "https://github.com/ahmedhanbal/SpaceshooterOOP",
    categories: ["All", "C/C++", "Games"]
  },
  {
    id: 4,
    title: "Labyrinth Explorer",
    description: "A maze escape game leveraging DSA for pathfinding and procedural generation.",
    projectUrl: "https://github.com/ahmedhanbal/TetrisPF",
    categories: ["All", "C/C++", "Games"]
  },
  {
    id: 5,
    title: "Traffic Simulation",
    description: "A comprehensive traffic at intersection simulator using OS concepts to model and optimize vehicle flow patterns.",
    projectUrl: "https://github.com/ahmedhanbal/TrafficSimulationOS",
    categories: ["All", "C/C++", "Other"]
  },
  {
    id: 6,
    title: "Bitmap Encoder",
    description: "A simple bitmap generator I made to study file handling and files.",
    projectUrl: "https://github.com/ahmedhanbal/BitmapEncoder",
    categories: ["All", "C/C++", "Other"]
  }
]

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = projects.filter(project =>
    project.categories.includes(activeCategory)
  )

  return (
    <section id="projects" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-all duration-300",
                activeCategory === category
                  ? "bg-portfolio-accent text-white font-medium shadow-md"
                  : "bg-portfolio-card-bg hover:bg-portfolio-border text-portfolio-text-secondary"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            projectUrl={project.projectUrl}
            delay={index}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default ProjectsSection
