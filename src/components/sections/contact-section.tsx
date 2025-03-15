"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const ContactSection = () => {
  // In a real application, you would set up a form library like react-hook-form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <section id="contact" className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <div className="h-1 w-16 bg-portfolio-accent mb-6"></div>
      </div>

      <Card className="bg-portfolio-card-bg border-portfolio-border p-6">
        <h3 className="text-xl font-medium mb-6">Contact Form</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-portfolio-text-secondary"
              >
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-portfolio-text-secondary"
              >
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                className="bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-portfolio-text-secondary"
            >
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Subject"
              className="bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-portfolio-text-secondary"
            >
              Your Message
            </label>
            <Textarea
              id="message"
              placeholder="Write your message here..."
              className="min-h-[150px] bg-portfolio-secondary-bg border-portfolio-border focus:border-portfolio-accent text-portfolio-text-primary"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-black"
            >
              Send Message
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}

export default ContactSection
