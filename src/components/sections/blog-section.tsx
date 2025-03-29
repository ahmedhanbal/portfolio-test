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

          <Link
            href={`#blog/${post.slug}`}
            className="text-portfolio-accent hover:text-portfolio-accent/80 flex items-center gap-2 mt-auto w-fit"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

const BlogViewModal: React.FC<{ blog: BlogPost | null, onClose: () => void }> = ({ blog, onClose }) => {
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
              <span>{new Date(blog.published_at).toLocaleDateString()}</span>
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
              <div key={post.id} onClick={() => setSelectedPost(post)}>
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
