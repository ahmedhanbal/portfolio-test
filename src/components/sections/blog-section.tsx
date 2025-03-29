"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight, Tag, X, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published_at: string;
  updated_at: string;
}

interface BlogPostProps {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  slug: string;
  tags: string[];
  index: number;
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

const BlogPost: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="bg-portfolio-card-bg border-portfolio-border p-6 h-full backdrop-blur-md bg-portfolio-card-bg/70 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-medium mb-3">{post.title}</h3>

          <div className="flex items-center gap-4 text-sm text-portfolio-text-secondary mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.published_at).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-portfolio-text-secondary mb-6 flex-grow">{post.excerpt || ''}</p>

          <button
            className="text-portfolio-accent hover:text-portfolio-accent/80 flex items-center gap-2 mt-auto w-fit bg-transparent border-0 p-0 cursor-pointer"
            aria-label={`Read more about ${post.title}`}
            onClick={(e) => {
              e.stopPropagation();
              const parentDiv = e.currentTarget.closest('[data-slug]');
              if (parentDiv) {
                parentDiv.dispatchEvent(new Event('click', { bubbles: true }));
              }
            }}
          >
            Read more <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

const BlogViewModal: React.FC<{ blog: BlogPost | null, onClose: () => void }> = ({ blog, onClose }) => {
  if (!blog) return null;

  const renderContent = (content: string) => {
    // Split content by lines
    const lines = content.split('\n');
    const result = [];
    
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeLanguage = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.startsWith('```') && !inCodeBlock) {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.replace('```', '').trim();
        codeBlockContent = [];
        continue;
      } else if (line.includes('```') && inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        result.push(
          <pre key={`code-${i}`} className="bg-gray-800 p-4 rounded-md my-4 overflow-x-auto">
            <code className="text-gray-200 font-mono whitespace-pre">
              {codeBlockContent.join('\n')}
            </code>
          </pre>
        );
        continue;
      } else if (inCodeBlock) {
        // Inside code block
        codeBlockContent.push(line);
        continue;
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        result.push(
          <h1 key={`h1-${i}`} className="text-3xl font-bold mb-6 mt-8">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        result.push(
          <h2 key={`h2-${i}`} className="text-2xl font-semibold mb-4 mt-6">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        result.push(
          <h3 key={`h3-${i}`} className="text-xl font-medium mb-3 mt-5">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.trim() === '') {
        // Empty line
        result.push(<div key={`empty-${i}`} className="h-4" />);
      } else {
        // Regular paragraph - with link parsing
        const parsedLine = parseLinks(line);
        result.push(
          <p key={`p-${i}`} className="mb-4 text-portfolio-text-secondary">
            {parsedLine}
          </p>
        );
      }
    }
    
    return result;
  };
  
  // Helper function to parse links in text
  const parseLinks = (text: string) => {
    // Regex to match markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    // If no links, return the text as is
    if (!linkRegex.test(text)) {
      return text;
    }
    
    // Split by the link pattern
    const parts = text.split(linkRegex);
    const result = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Text before or after a link or between links
        result.push(parts[i]);
      } else if (i % 3 === 1) {
        // Link text
        const linkText = parts[i];
        const linkUrl = parts[i + 1];
        result.push(
          <a 
            key={`link-${i}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-accent hover:underline"
          >
            {linkText}
          </a>
        );
      }
    }
    
    return result;
  };

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
              <span>{new Date(blog.published_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {renderContent(blog.content)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch blog posts');
        }
        
        console.log('Blog posts data:', data);
        
        if (data.posts) {
          setPosts(data.posts);
        } else {
          console.error('Invalid response format, missing posts array:', data);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.excerpt?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-portfolio-text-secondary w-4 h-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-10 bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 rounded-full border-4 border-portfolio-accent border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-portfolio-text-secondary py-12">
            {error}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-portfolio-text-secondary py-12">
            No posts found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                data-slug={post.slug}
              >
                <BlogPost
                  post={post}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedPost && (
          <BlogViewModal
            blog={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default BlogSection
