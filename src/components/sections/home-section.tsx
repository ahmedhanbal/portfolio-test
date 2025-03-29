"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Code2 } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  date: string
  readTime: string
  excerpt: string
  slug: string
  tags: string[]
}

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link: string
  github: string
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

const HomeSection = () => {
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [latestProject, setLatestProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsResponse, projectsResponse] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/projects')
        ]);

        const postsData = await postsResponse.json();
        const projectsData = await projectsResponse.json();

        console.log('Blog data:', postsData);
        console.log('Project data:', projectsData);

        // Handle blog data
        if (postsData.posts && postsData.posts.length > 0) {
          const latestBlogPost = postsData.posts[0];
          setLatestPost({
            id: latestBlogPost.id,
            title: latestBlogPost.title,
            date: latestBlogPost.published_at,
            readTime: '5 min read', // Default read time
            excerpt: latestBlogPost.excerpt || 'No excerpt available',
            slug: latestBlogPost.slug,
            tags: ['Technology', 'Windows', 'Software'] // Default tags since they're not in the API
          });
        }

        // Handle projects data
        if (projectsData.posts && projectsData.posts.length > 0) {
          const latestProjectData = projectsData.posts[0];
          setLatestProject({
            id: latestProjectData.id,
            title: latestProjectData.title,
            description: latestProjectData.description,
            technologies: latestProjectData.technologies || [],
            link: latestProjectData.link,
            github: latestProjectData.github
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 rounded-full border-4 border-portfolio-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <section id="home" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Welcome</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {latestPost && (
          <motion.div variants={itemVariants}>
            <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-portfolio-accent/10 flex items-center justify-center text-portfolio-accent">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">Latest Blog Post</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {latestPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-portfolio-accent/10 text-portfolio-accent border-portfolio-accent/20 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h4 className="text-xl font-medium mb-2">{latestPost.title}</h4>
              <div className="flex items-center gap-4 text-sm text-portfolio-text-secondary mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(latestPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{latestPost.readTime}</span>
                </div>
              </div>

              <p className="text-portfolio-text-secondary mb-6">{latestPost.excerpt}</p>

              <button
                onClick={() => {
                  // First navigate to the blog section using the main app's navigation
                  const mainContent = document.querySelector("div[id='blog']");
                  if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                    
                    // Find and click on the correct blog navigation item to activate that section
                    const blogNavItem = Array.from(document.querySelectorAll('button'))
                      .find(el => el.textContent?.includes('Blog'));
                    
                    if (blogNavItem) {
                      blogNavItem.click();
                      
                      // After a short delay, find and click the blog post
                      setTimeout(() => {
                        const postElement = document.querySelector(`[data-slug="${latestPost.slug}"]`);
                        if (postElement) {
                          (postElement as HTMLElement).click();
                        }
                      }, 300);
                    }
                  }
                }}
                className="text-portfolio-accent hover:text-portfolio-accent/80 flex items-center gap-2 mt-auto w-fit bg-transparent border-0 p-0 cursor-pointer"
              >
                Read more <ArrowRight className="w-4 h-4" />
              </button>
            </Card>
          </motion.div>
        )}

        {latestProject && (
          <motion.div variants={itemVariants}>
            <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-portfolio-accent/10 flex items-center justify-center text-portfolio-accent">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">Latest Project</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {latestProject.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="bg-portfolio-accent/10 text-portfolio-accent border-portfolio-accent/20 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <h4 className="text-xl font-medium mb-2">{latestProject.title}</h4>
              <p className="text-portfolio-text-secondary mb-6">{latestProject.description}</p>

              <div className="flex gap-4">
                <Link
                  href={latestProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-accent hover:text-portfolio-accent/80 flex items-center gap-2"
                >
                  View Project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default HomeSection 