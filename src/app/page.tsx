"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sun,
  Moon,
  Download,
  Github,
  Linkedin,
  Mail,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import emailjs from "@emailjs/browser"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("home")

  const homeRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLSpanElement | null>(null)
  const navRefs = useRef<Array<HTMLButtonElement | null>>([])

  const navItems: { id: string; label: string }[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    [],
  )

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        setIsScrolled(scrollY > 50)
        const scrollPosition = scrollY + 120

        if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
          setActiveTab("contact")
        } else if (educationRef.current && scrollPosition >= educationRef.current.offsetTop) {
          setActiveTab("education")
        } else if (skillsRef.current && scrollPosition >= skillsRef.current.offsetTop) {
          setActiveTab("skills")
        } else if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop) {
          setActiveTab("projects")
        } else {
          setActiveTab("home")
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const container = navContainerRef.current
    const indicator = indicatorRef.current
    if (!container || !indicator) return

    const idx = navItems.findIndex((n) => n.id === activeTab)
    const btn = navRefs.current[idx]

    if (btn) {
      const containerRect = container.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      const left = btnRect.left - containerRect.left
      indicator.style.width = `${btnRect.width}px`
      indicator.style.transform = `translateX(${left}px)`
      indicator.style.opacity = "1"
    } else {
      indicator.style.width = "0px"
      indicator.style.opacity = "0"
    }
  }, [activeTab, navItems])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveTab("home")
  }, [])

  const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement | null>, tab: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveTab(tab)
    }
  }, [])

  const projects = useMemo(
    () => [
      {
        title: "Digital Healthcare Platform – Patient & Provider Portal",
        description: [
          "A next-generation healthcare platform designed to improve patient outcomes and provider efficiency.",
          "Developed a secure and scalable platform integrating telemedicine, AI-driven diagnostics, and electronic medical records (EMR).",
          "Enhanced patient engagement with automated appointment reminders and an intuitive user interface.",
          "Streamlined healthcare operations through HL7/FHIR-compliant data integrations.",
        ],
        tech: [
          "React.js",
          "TypeScript",
          "Next.js",
          "React Query",
          "Material-UI",
          "Nest.js",
          "PostgreSQL",
          "Docker",
          "Kafka",
        ],
      },
      {
        title: "Employee Management System – CRM-Style HR Automation",
        description: [
          "A cloud-based HR automation system built to digitize workflows and streamline employee management.",
          "Built a cloud-native HR platform automating payroll, performance tracking, and employee lifecycle management.",
          "Optimized payroll operations and reporting with robust backend workflows.",
          "Delivered a self-service employee portal to reduce dependency on HR support.",
        ],
        tech: [
          "React.js",
          "Redux",
          "React Query",
          "Material-UI",
          "SCSS",
          "Node.js",
          "Firebase",
          "Docker",
          "GitLab CI/CD",
        ],
      },
      {
        title: "Employee Management Mobile App – React Native Extension",
        description: [
          "A mobile extension empowering employees and HR with real-time access to key workforce tools.",
          "Developed a cross-platform mobile app (iOS & Android) for HR functions including timesheets, payroll, and approvals.",
          "Delivered consistent user experience with a single codebase and modular architecture.",
          "Implemented offline-first data sync and real-time notifications using Firebase.",
        ],
        tech: ["React Native", "TypeScript", "Redux", "React Query", "Firebase", "Material Design", "GitLab CI/CD"],
      },
    ],
    [],
  )

  const education = [
    {
      institution: "Kennesaw State University, Georgia, USA",
      degree: "Master of Science, Computer Science",
      gpa: "GPA: 3.87 / 4.0",
    },
    {
      institution: "Sasi Engineering College, Andhra Pradesh, India",
      degree: "Bachelor of Technology, Computer Science & Engineering",
      gpa: "GPA: 8.5 / 10.0",
    },
  ]

  const sendEmail = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      )
      .then(
        () => {
          setLoading(false)
          setSuccess(true)
          ;(e.target as HTMLFormElement).reset()
          setTimeout(() => setSuccess(false), 3000)
        },
        () => {
          setLoading(false)
          setSuccess(false)
        },
      )
  }, [])

  const Avatar = ({ size = 40 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className="rounded-full overflow-hidden" aria-hidden>
      <defs>
        <linearGradient id="avatarGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="25" fill="url(#avatarGrad)" />
      <g fill="#fff" transform="translate(18,20)">
        <circle cx="32" cy="20" r="12" />
        <path d="M0 64c0-13 22-20 32-20s32 7 32 20v4H0v-4z" />
      </g>
      <circle cx="75" cy="25" r="12" fill="#a3e635" opacity="0.8" />
    </svg>
  )

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-slate-950 text-slate-50" : "bg-gradient-to-b from-amber-50 to-white text-slate-900"}`}
    >
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-40 flex items-center justify-between px-8 py-4 backdrop-blur-md transition-all duration-300 ${
          darkMode ? "bg-slate-900/80 border-b border-slate-800" : "bg-white/70 border-b border-amber-100 shadow-sm"
        }`}
      >
        <button
          onClick={() => scrollToSection(homeRef, "home")}
          className="flex items-center gap-3 text-left focus:outline-none group"
          aria-label="Go to home section"
        >
          <Avatar size={40} />
          <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:to-yellow-500 transition-all">
            Vamsi
          </span>
        </button>

        <nav ref={navContainerRef} className="relative hidden md:flex gap-8 text-sm font-medium">
          <span
            ref={indicatorRef}
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300"
            style={{
              width: 0,
              transform: "translateX(0px)",
              background: "linear-gradient(90deg, #d97706, #f59e0b)",
            }}
          />

          {navItems.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el: HTMLButtonElement | null) => {
                navRefs.current[i] = el
              }}
              onClick={() =>
                scrollToSection(
                  tab.id === "home"
                    ? homeRef
                    : tab.id === "projects"
                      ? projectsRef
                      : tab.id === "skills"
                        ? skillsRef
                        : tab.id === "education"
                          ? educationRef
                          : contactRef,
                  tab.id,
                )
              }
              className={`relative z-10 transition-colors px-1 py-2 ${
                activeTab === tab.id
                  ? "text-amber-600 dark:text-amber-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-300"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 h-10 w-10 border-amber-200 hover:bg-amber-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </Button>
          <Button
            variant="default"
            onClick={() => {
              window.open("/resume.pdf", "_blank")
              const link = document.createElement("a")
              link.href = "/resume.pdf"
              link.download = "Veera_Resume.pdf"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium transition-all"
          >
            <Download className="h-5 w-5 mr-2" /> Resume
          </Button>
        </div>
      </header>

      <section ref={homeRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className={`absolute top-20 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl ${darkMode ? "bg-amber-900" : "bg-amber-200"}`}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl ${darkMode ? "bg-emerald-900" : "bg-emerald-100"}`}
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-slate-800/50 border border-amber-200 dark:border-slate-700 mb-6"
          >
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Full Stack Developer</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Crafting elegant{" "}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
              digital experiences
            </span>
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto mb-8 text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            4+ years of building scalable applications with React, Node.js, and Next.js. Specializing in healthcare and
            HR automation.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="https://github.com/vamsipachipala" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="rounded-full gap-2 border-amber-200 hover:bg-amber-100 dark:border-slate-700 dark:hover:bg-slate-800 bg-transparent"
              >
                <Github className="h-5 w-5" /> GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/vamsi-pachipala-7b7b2321a/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="rounded-full gap-2 border-amber-200 hover:bg-amber-100 dark:border-slate-700 dark:hover:bg-slate-800 bg-transparent"
              >
                <Linkedin className="h-5 w-5" /> LinkedIn
              </Button>
            </a>
            <Button
              onClick={() => scrollToSection(contactRef, "contact")}
              className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium gap-2 transition-all"
            >
              <Mail className="h-5 w-5" /> Contact
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section
        ref={projectsRef}
        className={`px-6 py-20 ${darkMode ? "bg-slate-900/50" : "bg-gradient-to-b from-amber-50/50 to-emerald-50/30"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Transforming ideas into scalable solutions with modern technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`rounded-2xl h-full overflow-hidden border transition-all duration-300 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-900/20"
                      : "bg-white border-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/50"
                  } ${activeProject === i ? "scale-105" : "scale-100"}`}
                  onMouseEnter={() => setActiveProject(i)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="mb-4 flex justify-between items-start">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h4>
                      <ExternalLink
                        className={`h-5 w-5 text-amber-500 transition-all ${activeProject === i ? "opacity-100 translate-x-1 -translate-y-1" : "opacity-0"}`}
                      />
                    </div>

                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm flex-grow">
                      {project.description.map((d, j) => (
                        <li key={j} className="text-slate-600 dark:text-slate-300">
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-amber-100 dark:border-slate-700">
                      {project.tech.map((t, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            darkMode ? "bg-amber-900/30 text-amber-300" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={skillsRef} className={`px-6 py-20 ${darkMode ? "bg-slate-950/50" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Skills & Expertise</h3>
            <p className="text-slate-600 dark:text-slate-400">Technologies and tools I use to bring ideas to life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-700/50 border border-slate-700"
                    : "bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-amber-600 dark:text-amber-400">Frontend Development</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  React, Next.js, Redux, React Native, TypeScript, Material UI, Tailwind CSS
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-700/50 border border-slate-700"
                    : "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-emerald-600 dark:text-emerald-400">
                  Backend Development
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Node.js, Express, Java, Spring Boot, REST APIs, GraphQL
                </p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-700/50 border border-slate-700"
                    : "bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Database & Storage</h4>
                <p className="text-slate-600 dark:text-slate-300">PostgreSQL, MongoDB, Firebase, Prisma, Redis</p>
              </div>

              <div
                className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-700/50 border border-slate-700"
                    : "bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">Cloud & DevOps</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  GCP, Docker, CI/CD, GitHub Actions, Kubernetes, Terraform
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        ref={educationRef}
        className={`px-6 py-20 ${darkMode ? "bg-slate-900/50" : "bg-gradient-to-b from-emerald-50/50 to-amber-50/30"}`}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              Education
            </h3>
            <p className="text-slate-600 dark:text-slate-400">My academic background and qualifications</p>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 hover:border-amber-500/50"
                    : "bg-white border-amber-100 hover:border-amber-300"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-amber-600 dark:text-amber-400">{edu.institution}</h4>
                    <p className="text-lg font-medium mt-2 text-slate-900 dark:text-white">{edu.degree}</p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{edu.gpa}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className={`px-6 py-20 ${darkMode ? "bg-slate-950/50" : "bg-gradient-to-b from-white to-amber-50"}`}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Have a project in mind? Let&apos;s create something amazing together!
            </p>
          </motion.div>

          <motion.form
            onSubmit={sendEmail}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  required
                  className={`w-full p-4 rounded-xl border transition-all focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-white border-amber-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  required
                  className={`w-full p-4 rounded-xl border transition-all focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-white border-amber-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Hello, I&apos;d like to talk about..."
                required
                rows={5}
                className={`w-full p-4 rounded-xl border transition-all focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-amber-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl py-6 text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium transition-all"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </Button>
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-600 dark:text-emerald-400 text-center mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
              >
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>

      <footer
        className={`border-t transition-colors duration-300 py-8 ${
          darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-amber-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            className="text-center text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Veera Venkata Vamsi Pachipala. All Rights Reserved.
          </motion.p>
          <motion.div
            className="flex justify-center gap-6 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://github.com/vamsipachipala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/vamsi-pachipala-7b7b2321a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:vamsipachipala@gmail.com"
              className="text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
