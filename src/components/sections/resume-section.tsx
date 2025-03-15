"use client"

import React from "react"
import { Card } from "@/components/ui/card"

interface TimelineItemProps {
  title: string
  organization: string
  period: string
  description?: string
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, organization, period, description }) => {
  return (
    <div className="relative pl-8 pb-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-portfolio-border">
      <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-portfolio-accent"></div>
      <div className="mb-1 text-lg font-medium">{title}</div>
      <div className="mb-2 text-portfolio-accent">{organization}</div>
      <div className="mb-3 text-sm text-portfolio-text-secondary">{period}</div>
      {description && <p className="text-sm text-portfolio-text-secondary">{description}</p>}
    </div>
  )
}

interface SkillCategoryProps {
  title: string
  skills: string[]
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm bg-portfolio-card-bg rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const ResumeSection = () => {
  return (
    <section id="resume" className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Resume</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-medium mb-6">Education</h3>
            <TimelineItem
              title="Bachelor of Technology"
              organization="Guru Nanak Dev University"
              period="2022 — 2026"
            />
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Experience</h3>
            <TimelineItem
              title="Software Developer Intern"
              organization="Journim"
              period="July 2024 — September 2024"
              description="Developed the backend for Journim's MVP using Node.js, Express.js and MongoDB, optimizing performance and scalability. Led the deployment process with Docker and AWS to ensure efficient and reliable application delivery."
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-6">My Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCategory
            title="Languages"
            skills={["JavaScript", "TypeScript", "Java", "Golang"]}
          />
          <SkillCategory
            title="Frontend"
            skills={["React.js", "Next.js", "React Native", "Redux", "Zustand", "Tailwind CSS"]}
          />
          <SkillCategory
            title="Backend"
            skills={["Node.js", "Express.js", "Next.js", "Langchain"]}
          />
          <SkillCategory
            title="Database"
            skills={["MongoDB", "PostgreSQL", "Redis"]}
          />
          <SkillCategory
            title="Tools & Technologies"
            skills={["Git", "GitHub", "AWS", "Docker", "Nginx"]}
          />
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
