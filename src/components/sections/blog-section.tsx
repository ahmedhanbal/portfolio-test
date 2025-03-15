"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Tag, X, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface BlogPostProps {
  title: string
  date: string
  readTime: string
  excerpt: string
  slug: string
  tags: string[]
  index: number
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

// Sample blog content for the Winget blog
const wingetBlogContent = `
# Winget - The Windows Package Manager

Windows Package Manager (also known as winget) is a free and open-source package manager designed for Microsoft Windows 10 and Windows 11. It was announced at Microsoft Build 2020 and offers a command-line interface for installing applications.

## Why Use Winget?

Winget simplifies the way applications are installed on Windows. Instead of visiting websites, downloading installers, and clicking through setup wizards, you can install applications with a single command. It's similar to package managers in Linux distributions like apt for Debian/Ubuntu or dnf for Fedora.

## Basic Commands

Here are some essential winget commands:

### Search for packages

\`\`\`
winget search [application-name]
\`\`\`

For example:
\`\`\`
winget search vscode
\`\`\`

### Install an application

\`\`\`
winget install [application-identifier]
\`\`\`

For example:
\`\`\`
winget install Microsoft.VisualStudioCode
\`\`\`

### List installed applications

\`\`\`
winget list
\`\`\`

### Upgrade an application

\`\`\`
winget upgrade [application-identifier]
\`\`\`

For example:
\`\`\`
winget upgrade Microsoft.VisualStudioCode
\`\`\`

### Upgrade all applications

\`\`\`
winget upgrade --all
\`\`\`

### Uninstall an application

\`\`\`
winget uninstall [application-identifier]
\`\`\`

## Benefits of Winget

1. **Ease of Use**: Install applications with simple commands
2. **Automation**: Create scripts to install multiple applications at once
3. **No Bloatware**: Avoid extra software that often comes with installers
4. **Open Source**: Community-driven development
5. **Integration**: Works well with other Windows tools and PowerShell

## Getting Started

Winget comes pre-installed on newer versions of Windows 10 and Windows 11. If you don't have it, you can install it from the Microsoft Store as "App Installer".

For developers and system administrators, winget offers a great way to automate software installation and maintenance on Windows machines. It's a powerful tool that brings the convenience of Linux package managers to the Windows ecosystem.
`;

const BlogPost: React.FC<BlogPostProps> = ({ title, date, readTime, excerpt, slug, tags, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-portfolio-accent/10 text-portfolio-accent border-portfolio-accent/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-medium mb-3">{title}</h3>

          <div className="flex items-center gap-4 text-sm text-portfolio-text-secondary mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <p className="text-portfolio-text-secondary mb-6 flex-grow">{excerpt}</p>

          <Link
            href={`#blog/${slug}`}
            className="text-portfolio-accent hover:text-portfolio-accent/80 flex items-center gap-2 mt-auto w-fit"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

const BlogViewModal: React.FC<{ blog: any, onClose: () => void }> = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-portfolio-secondary-bg border border-portfolio-border rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center sticky top-0 bg-portfolio-secondary-bg p-6 border-b border-portfolio-border z-10">
          <h2 className="text-2xl font-semibold">{blog.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-portfolio-card-bg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-portfolio-text-secondary mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {blog.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-portfolio-accent/10 text-portfolio-accent border-portfolio-accent/20 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {blog.content.split('\n').map((paragraph: string, i: number) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={i} className="text-3xl font-bold mb-6 mt-8">{paragraph.replace('# ', '')}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-semibold mb-4 mt-6">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-medium mb-3 mt-5">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                return (
                  <pre key={i} className="bg-black/20 p-4 rounded-md my-4 overflow-x-auto">
                    <code>{paragraph.replace(/```/g, '').trim()}</code>
                  </pre>
                );
              } else if (paragraph.startsWith('```')) {
                return (
                  <pre key={i} className="bg-black/20 p-4 rounded-t-md mt-4">
                    <code>{paragraph.replace('```', '').trim()}</code>
                  </pre>
                );
              } else if (paragraph.endsWith('```')) {
                return (
                  <pre key={i} className="bg-black/20 p-4 rounded-b-md mb-4">
                    <code>{paragraph.replace('```', '').trim()}</code>
                  </pre>
                );
              } else if (paragraph.trim() === '') {
                return <div key={i} className="h-4"></div>;
              } else {
                return <p key={i} className="mb-4 text-portfolio-text-secondary">{paragraph}</p>;
              }
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const BlogSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Winget: The Windows Package Manager",
      date: "March 15, 2025",
      readTime: "5 min read",
      excerpt: "Learn about Windows Package Manager (winget), Microsoft's answer to apt and brew. A powerful command-line tool for managing software installations.",
      slug: "winget-windows-package-manager",
      tags: ["Windows", "Package Manager", "CLI"],
      content: wingetBlogContent
    }
  ];

  // All unique tags
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

  // Filter blogs by search and tags
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Blog</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-portfolio-text-secondary" size={18} />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-portfolio-card-bg border-portfolio-border"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={`cursor-pointer ${!selectedTag ? "bg-portfolio-accent text-white" : "bg-portfolio-card-bg hover:bg-portfolio-border text-portfolio-text-secondary"}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={`cursor-pointer ${selectedTag === tag ? "bg-portfolio-accent text-white" : "bg-portfolio-card-bg hover:bg-portfolio-border text-portfolio-text-secondary"}`}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {filteredBlogs.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBlogs.map((blog, index) => (
            <div key={blog.id} onClick={() => setSelectedBlog(blog)}>
              <BlogPost
                title={blog.title}
                date={blog.date}
                readTime={blog.readTime}
                excerpt={blog.excerpt}
                slug={blog.slug}
                tags={blog.tags}
                index={index}
              />
            </div>
          ))}
        </motion.div>
      ) : (
        <Card className="bg-portfolio-card-bg border-portfolio-border p-8 text-center">
          <p className="text-portfolio-text-secondary">No blog posts found matching your criteria.</p>
        </Card>
      )}

      {selectedBlog && (
        <BlogViewModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </section>
  )
}

export default BlogSection
