"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Mail, Github, Linkedin, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

const Sidebar = () => {
  return (
    <div className="w-full md:w-[320px] md:min-h-screen p-4">
      <Card className="bg-portfolio-secondary-bg border-portfolio-border p-6 flex flex-col items-center h-full backdrop-blur-md bg-portfolio-secondary-bg/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[140px] h-[140px] rounded-full overflow-hidden mb-5 ring-4 ring-portfolio-accent/20"
        >
          <Image
            src="https://ext.same-assets.com/3872259316/1693919926.png"
            alt="Ahmed Ali Zahid"
            width={140}
            height={140}
            className="object-cover"
          />
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-2xl font-semibold mb-2"
        >
          Ahmed Ali Zahid
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="px-4 py-1 bg-portfolio-card-bg rounded-full text-sm mb-8"
        >
          CS Undergrad at NUCES
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="w-full mb-6 border-t border-portfolio-border pt-6 space-y-4"
        >
          <div className="flex items-center gap-3 group hover:text-portfolio-accent transition-all duration-300">
            <Mail className="w-5 h-5 text-portfolio-text-secondary group-hover:text-portfolio-accent transition-colors" />
            <Link
              href="mailto:ahmedalizahid@gmail.com"
              className="text-sm group-hover:text-portfolio-accent transition-colors"
            >
              ahmedalizahid@gmail.com
            </Link>
          </div>

          <div className="flex items-center gap-3 group hover:text-portfolio-accent transition-all duration-300">
            <MapPin className="w-5 h-5 text-portfolio-text-secondary group-hover:text-portfolio-accent transition-colors" />
            <span className="text-sm">Rawalpindi, Pakistan</span>
          </div>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex gap-6 mt-auto"
        >
          <Link
            href="https://www.linkedin.com/in/ahmedhanbal"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-portfolio-card-bg hover:bg-portfolio-accent hover:text-white transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/ahmedhanbal"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-portfolio-card-bg hover:bg-portfolio-accent hover:text-white transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </Link>
        </motion.div>
      </Card>
    </div>
  )
}

export default Sidebar
