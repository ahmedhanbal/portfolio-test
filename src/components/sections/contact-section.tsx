"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Send, User, Bookmark, CheckCircle } from "lucide-react"

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // In a real application, you would send the form data to a backend service
    // For demonstration purposes, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset the submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <section id="contact" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-portfolio-card-bg border-portfolio-border p-8 backdrop-blur-md bg-portfolio-card-bg/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Mail className="text-portfolio-accent" />
                Get in Touch
              </h3>

              <p className="text-portfolio-text-secondary mb-6">
                Have a question or want to work together? Feel free to reach out using the contact form.
              </p>

              <div className="space-y-2 text-portfolio-text-secondary">
                <p>I'll get back to you as soon as possible.</p>
                <p>Contact email: <span className="text-portfolio-accent">ahmedali.zahid14@gmail.com</span></p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-portfolio-text-secondary">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-portfolio-text-secondary" size={16} />
                        <Input
                          name="name"
                          type="text"
                          placeholder="Your name"
                          className="pl-10 bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                          required
                          value={formState.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-portfolio-text-secondary" size={16} />
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          className="pl-10 bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                          required
                          value={formState.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Bookmark className="absolute left-3 top-3 text-portfolio-text-secondary" size={16} />
                      <Input
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        className="pl-10 bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      placeholder="Your message..."
                      className="min-h-[150px] bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                      required
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-white flex gap-2 items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}

export default ContactSection
