"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, Download, Github, Linkedin, Mail, ChevronUp, ExternalLink, GraduationCap } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active tab based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveTab("contact");
      } else if (educationRef.current && scrollPosition >= educationRef.current.offsetTop) {
        setActiveTab("education");
      } else if (skillsRef.current && scrollPosition >= skillsRef.current.offsetTop) {
        setActiveTab("skills");
      } else if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop) {
        setActiveTab("projects");
      } else {
        setActiveTab("home");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("home");
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, tab: string) => {
      if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth" });
          setActiveTab(tab);
      }
  };

  const projects = [
    {
      title: "Digital Healthcare Platform – Patient & Provider Portal",
      description: [
        "A next-generation healthcare platform designed to improve patient outcomes and provider efficiency.",
        "Developed a secure and scalable platform integrating telemedicine, AI-driven diagnostics, and electronic medical records (EMR).",
        "Enhanced patient engagement with automated appointment reminders and an intuitive user interface.",
        "Streamlined healthcare operations through HL7/FHIR-compliant data integrations."
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
        "Kafka"
      ],
    },
    {
      title: "Employee Management System – CRM-Style HR Automation",
      description: [
        "A cloud-based HR automation system built to digitize workflows and streamline employee management.",
        "Built a cloud-native HR platform automating payroll, performance tracking, and employee lifecycle management.",
        "Optimized payroll operations and reporting with robust backend workflows.",
        "Delivered a self-service employee portal to reduce dependency on HR support."
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
        "GitLab CI/CD"
      ],
    },
    {
      title: "Employee Management Mobile App – React Native Extension",
      description: [
        "A mobile extension empowering employees and HR with real-time access to key workforce tools.",
        "Developed a cross-platform mobile app (iOS & Android) for HR functions including timesheets, payroll, and approvals.",
        "Delivered consistent user experience with a single codebase and modular architecture.",
        "Implemented offline-first data sync and real-time notifications using Firebase."
      ],
      tech: [
        "React Native",
        "TypeScript",
        "Redux",
        "React Query",
        "Firebase",
        "Material Design",
        "GitLab CI/CD"
      ],
    },
  ];
  

  const education = [
    {
      institution: "Kennesaw State University, Georgia, USA",
      degree: "Master of Science, Computer Science",
      gpa: "GPA: 3.87 / 4.0"
    },
    {
      institution: "Sasi Engineering College, Andhra Pradesh, India",
      degree: "Bachelor of Technology, Computer Science & Engineering",
      gpa: "GPA: 8.5 / 10.0"
    }
  ];

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          (e.target as HTMLFormElement).reset();
          setTimeout(() => setSuccess(false), 3000);
        },
        () => {
          setLoading(false);
          setSuccess(false);
        }
      );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header with single-line navigation */}
      <header 
  className={`sticky top-0 z-40 flex items-center justify-between px-8 py-4 
  backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md`}
>
  {/* Left: Name */}
  <h1 
    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
    bg-clip-text text-transparent cursor-pointer"
    onClick={() => scrollToSection(homeRef, "home")}
  >
    Veera Venkata Vamsi Pachipala
  </h1>

  {/* Middle: Nav */}
  <nav className="flex gap-8 text-sm font-medium">
    {[
      { id: "home", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" }
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => scrollToSection(
          tab.id === "home" ? homeRef : 
          tab.id === "projects" ? projectsRef : 
          tab.id === "skills" ? skillsRef : 
          tab.id === "education" ? educationRef : 
          contactRef, 
          tab.id
        )}
        className={`relative transition-colors ${
          activeTab === tab.id
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
        }`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 rounded"></span>
        )}
      </button>
    ))}
  </nav>

  {/* Right: Theme + Resume */}
  <div className="flex items-center gap-3">
    <Button 
      variant="outline" 
      onClick={() => setDarkMode(!darkMode)}
      className="rounded-full p-2 h-10 w-10"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
    <Button
      variant="default"
      onClick={() => {
        window.open("/resume.pdf", "_blank");
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Veera_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
      className="rounded-full bg-blue-600 hover:bg-blue-700"
    >
      <Download className="h-5 w-5 mr-2" /> Resume
    </Button>
  </div>
</header>


      {/* Hero Section */}
      <section ref={homeRef} className="relative text-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-0 left-0 w-full h-full ${darkMode ? "opacity-5" : "opacity-10"}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Full Stack Developer
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            4+ years of experience building scalable applications with React, Node.js, Next.js, and Google Cloud.
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="https://github.com/vamsipachipala" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full gap-2">
                <Github className="h-5 w-5" /> GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/vamsi-pachipala-7b7b2321a/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full gap-2">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </Button>
            </a>
            <button onClick={() => scrollToSection(contactRef, "contact")}>
              <Button variant="default" className="rounded-full bg-blue-600 hover:bg-blue-700 gap-2">
                <Mail className="h-5 w-5" /> Contact
              </Button>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} className="px-6 py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            className="text-3xl font-semibold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Here are some of my recent projects that demonstrate my skills and expertise.
          </motion.p>
          
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
                  className="rounded-2xl shadow-lg h-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setActiveProject(i)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="mb-4 flex justify-between items-start">
                      <h4 className="text-xl font-bold">{project.title}</h4>
                      <ExternalLink className={`h-5 w-5 text-blue-500 transition-opacity ${activeProject === i ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    
                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm flex-grow">
                      {project.description.map((d, j) => (
                        <li key={j} className="text-gray-600 dark:text-gray-300">{d}</li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {project.tech.map((t, j) => (
                        <span
                          key={j}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
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

      {/* Skills */}
      <section ref={skillsRef} className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h3 
            className="text-3xl font-semibold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 shadow-md">
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Frontend Development</h4>
                <p>React, Next.js, Redux, React Native, TypeScript, Material UI, Tailwind CSS</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 shadow-md">
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Backend Development</h4>
                <p>Node.js, Express, Java, Spring Boot, REST APIs, GraphQL</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 shadow-md">
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Database & Storage</h4>
                <p>PostgreSQL, MongoDB, Firebase, Prisma, Redis</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 shadow-md">
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Cloud & DevOps</h4>
                <p>GCP, Docker, CI/CD, GitHub Actions, Kubernetes, Terraform</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="px-6 py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.h3 
            className="text-3xl font-semibold text-center mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Education
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            My academic background and qualifications
          </motion.p>
          
          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400">{edu.institution}</h4>
                    <p className="text-lg font-medium mt-2">{edu.degree}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{edu.gpa}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form with EmailJS */}
      <section ref={contactRef} className="px-6 py-16 bg-gradient-to-t from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto">
          <motion.h3 
            className="text-3xl font-semibold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h3>
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </motion.p>
          
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
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  placeholder="John Doe" 
                  required 
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder="john@example.com" 
                  required 
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">Your Message</label>
              <textarea 
                name="message" 
                id="message"
                placeholder="Hello, I'd like to talk about..." 
                required 
                rows={5} 
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              ></textarea>
            </div>
            <Button 
              type="submit" 
              variant="default" 
              className="w-full rounded-xl py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-all"
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
                className="text-green-500 text-center mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
              >
                Message sent successfully!
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Veera Venkata Vamsi Pachipala. All Rights Reserved.
          </motion.p>
          <motion.div 
            className="flex justify-center gap-6 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a href="https://github.com/vamsipachipala" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/vamsi-pachipala-7b7b2321a/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:vamsipachipala@gmail.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}