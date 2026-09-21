import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaBootstrap,
  FaGithub,
  FaEnvelope,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
  FaQuoteLeft,
  FaPaperPlane,
  FaStar,
  FaGraduationCap,
  FaBookOpen,
  FaCode,
  FaRocket,
  FaDownload,
  FaFolderOpen,
  FaServer,
  FaDatabase,
} from 'react-icons/fa'

import {
  SiMysql,
  SiTailwindcss,
  SiVite,
  SiFigma,
} from 'react-icons/si'

import { VscCode } from 'react-icons/vsc'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [selectedProject, setSelectedProject] = useState(null)
const [showAllProjects, setShowAllProjects] = useState(false)
const [selectedImage, setSelectedImage] = useState(null)
const [activeSection, setActiveSection] = useState('home')
const [showScrollTop, setShowScrollTop] = useState(false)
const [approvedReviews, setApprovedReviews] = useState([])
const [isLoadingReviews, setIsLoadingReviews] = useState(true)
const [showIntro, setShowIntro] = useState(true)
const [reviewForm, setReviewForm] = useState({

  name: '',
  role: '',
  message: '',
})

const [reviewRating, setReviewRating] = useState(0)
const handleNavClick = (e, sectionId) => {
  e.preventDefault()

  const section = document.getElementById(sectionId)

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  setIsMenuOpen(false)
}
const [reviewStatus, setReviewStatus] = useState('')
const [isSubmittingReview, setIsSubmittingReview] = useState(false)

const projectDetails = {
  rekamMedis: {
    title: 'Sistem Rekam Medis Klinik Gigi',
    role: 'Web Developer',
    status: 'In Development',
    description:
      'Aplikasi web untuk membantu pengelolaan data pasien, dokter, rekam medis, diagnosa, tindakan, pembayaran, dan laporan klinik gigi.',
    features: [
      'CRUD data pasien',
      'Manajemen dokter',
      'Rekam medis pasien',
      'Diagnosa dan tindakan',
      'Transaksi pembayaran',
      'Laporan klinik',
      'Multi-user access',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    gallery: [
      '/project-rekam-medis-main.png',
      '/project-pasien.png',
      '/project-tambah-pasien.png',
      '/project-rekam-medis.png',
      '/project-tindakan.png',
      '/project-resep.png',
      '/project-pembayaran.png',
      '/project-laporan.png',
    ],
  },

  portofolio: {
    title: 'Website Portofolio Pribadi',
    role: 'Frontend Developer',
    status: 'Active Project',
    description:
      'Website portofolio pribadi untuk menampilkan profil, pengalaman, skills, project, CV, kontak, serta fitur review pengunjung menggunakan Supabase.',
    features: [
      'Responsive layout',
      'Dark modern UI',
      'Scroll animation',
      'Download CV',
      'Contact links',
      'Project showcase',
      'Review system with Supabase',
    ],
    gallery: [
      '/portofolio/home.png',
      '/portofolio/about.png',
      '/portofolio/skills.png',
      '/portofolio/reviews.png',
    ],
    tech: ['React', 'Vite', 'CSS', 'Framer Motion', 'Supabase'],
  },
    companyProfile: {
    title: 'Website OQ Clinic Dentist',
    role: 'Web Developer',
    status: 'Completed',
    description:
      'Website company profile OQ Clinic Dentist yang dirancang untuk menampilkan informasi layanan, dokter, teknologi, promo, kontak, dan fitur booking secara modern dan responsif.',
    features: [
      'Responsive layout',
      'Informasi layanan klinik',
      'Informasi dokter',
      'Informasi teknologi',
      'Promo klinik',
      'Contact information',
      'Booking appointment',
    ],
gallery: [
  '/project-03/beranda.png.png',
],
    tech: ['Next.js', 'React', 'TypeScript', 'CSS'],
  },

}
      const getTechIcon = (tech) => {
        const icons = {
          React: <FaReact />,
          PHP: <FaPhp />,
          Laravel: <FaLaravel />,
          MySQL: <SiMysql />,
          Bootstrap: <FaBootstrap />,
          CSS: <FaCss3Alt />,
          Vite: <FaReact />,
          'Framer Motion': <FaReact />,
        }

        return icons[tech] || null
      }

      const handleReviewChange = (event) => {
        const { name, value } = event.target

        setReviewForm((previousForm) => ({
          ...previousForm,
          [name]: value,
        }))
      }

      const handleReviewSubmit = async (event) => {
        event.preventDefault()

        if (
          !reviewForm.name.trim() ||
          !reviewForm.message.trim() ||
          reviewRating === 0
        ) {
          setReviewStatus('Isi nama, review, dan pilih rating terlebih dahulu.')
          return
        }

        setIsSubmittingReview(true)
        setReviewStatus('Mengirim review...')

        const { error } = await supabase
          .from('reviews')
          .insert({
            name: reviewForm.name.trim(),
            role: reviewForm.role.trim() || null,
            message: reviewForm.message.trim(),
            rating: reviewRating,
            status: 'pending',
          })

       if (error) {
  console.error(
    'SUPABASE REVIEW ERROR:',
    JSON.stringify(error, null, 2)
  )

  setReviewStatus(
    `Review gagal: ${error.message} | Code: ${error.code}`
  )

  setIsSubmittingReview(false)
  return
}
        setReviewStatus(
          'Review berhasil dikirim dan sedang menunggu persetujuan. Terima kasih!'
        )

        setReviewForm({
          name: '',
          role: '',
          message: '',
        })

        setReviewRating(0)
        setIsSubmittingReview(false)
      }
      setTimeout(() => {
          setReviewStatus('')
        }, 4000)

              useEffect(() => {
          const sections = document.querySelectorAll('section[id]')

          const handleScroll = () => {
            let current = 'home'

            sections.forEach((section) => {
              const sectionTop = section.offsetTop - 120
              const sectionHeight = section.offsetHeight

              if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
              ) {
                current = section.getAttribute('id')
              }
            })

            setActiveSection(current)
          }

          window.addEventListener('scroll', handleScroll)
          handleScroll()


          
          return () => window.removeEventListener('scroll', handleScroll)
        }, [])

        useEffect(() => {
            const introTimer = setTimeout(() => {
              setShowIntro(false)
            }, 2600)

            return () => clearTimeout(introTimer)
          }, [])

          useEffect(() => {
            const handleScrollTopButton = () => {
              setShowScrollTop(window.scrollY > 500)
            }

            window.addEventListener('scroll', handleScrollTopButton)
            handleScrollTopButton()

            return () => {
              window.removeEventListener('scroll', handleScrollTopButton)
            }
          }, [])

useEffect(() => {
  const fetchApprovedReviews = async () => {
    setIsLoadingReviews(true)

    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, role, message, rating, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch approved reviews error:', error)
      setIsLoadingReviews(false)
      return
    }

    setApprovedReviews(data || [])
    setIsLoadingReviews(false)
  }

  fetchApprovedReviews()
}, [])

return (
    <div className="portofolio">
      {showIntro && (
      <motion.div
        className="intro-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="intro-content"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.img
            src="/logoputrahpz.png"
            alt="HPZ Logo"
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.div
            className="intro-icons"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span>&lt;/&gt;</span>
            <span>WEB</span>
            <span>DEV</span>
            <span>IT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            Welcome To My
            <br />
            <strong>Portfolio Website</strong>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            hendrikwanputra.dev
          </motion.p>
        </motion.div>
      </motion.div>
    )}
      <div className="background-grid"></div>
      <div className="floating-glow glow-one"></div>
      <div className="floating-glow glow-two"></div>
      <div className="floating-glow glow-three"></div>

      <nav className="navbar">
        <a href="#home" className="logo">
          <img src="/logoputrahpz.png" alt="HPZ Logo" />
        </a>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a
            href="#home"
            className={activeSection === 'home' ? 'active-link' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
         <a
            href="#about"
            className={activeSection === 'about' ? 'active-link' : ''}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </a>

          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active-link' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>

          <a
            href="#experience"
            className={activeSection === 'experience' ? 'active-link' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Experience
          </a>

          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active-link' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>

          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active-link' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>


      <section id="home" className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <span></span>
            Available for Web Developer Roles
          </div>

          <p className="hero-greeting">Hello, I'm</p>
          <h1>Hendrikwan Putra Zai</h1>
          <h2>Full-Stack Web Developer</h2>

          <p className="description">
            Lulusan Sistem Informasi yang berfokus pada pengembangan aplikasi web, pengelolaan database, dan dukungan teknis menggunakan React, PHP, Laravel, MySQL, dan teknologi web lainnya.
          </p>

<div className="hero-buttons">
  <a href="#projects" className="btn primary">
    <FaFolderOpen />
    View Projects
  </a>

  <a href="#contact" className="btn secondary">
    <FaPaperPlane />
    Contact Me
  </a>

  <a href="/cv-hendrikwan-putra.pdf" download className="btn outline">
    <FaDownload />
    Download CV
  </a>
</div>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
 <div className="code-card">
  <div className="code-card-header">
    <div className="code-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <p>developer.js</p>
  </div>

  <div className="code-content">
    <p>
      <span className="code-keyword">const</span>{' '}
      <span className="code-variable">developer</span>{' '}
      <span className="code-operator">=</span>{' '}
      <span className="code-bracket">&#123;</span>
    </p>

    <p>
      &nbsp;&nbsp;<span className="code-property">name</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-string">"Hendrikwan Putra Zai"</span>
      <span className="code-operator">,</span>
    </p>

    <p>
      &nbsp;&nbsp;<span className="code-property">role</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-string">"Web Developer | Information Systems"</span>
      <span className="code-operator">,</span>
    </p>

    <p>
      &nbsp;&nbsp;<span className="code-property">stack</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-bracket">[</span>
      <span className="code-string">"React"</span>
      <span className="code-operator">, </span>
      <span className="code-string">"Laravel"</span>
      <span className="code-operator">, </span>
      <span className="code-string">"MySQL"</span>
      <span className="code-bracket">]</span>
      <span className="code-operator">,</span>
    </p>

    <p>
      &nbsp;&nbsp;<span className="code-property">focus</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-string">"focus: "Development & Systems Support""</span>
    </p>

    <p>
      <span className="code-bracket">&#125;</span>
    </p>
  </div>
</div>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-header">
          <p>Get To Know More</p>
          <h2>About Me</h2>
        </div>

        <div className="about-layout">
          <motion.div
            className="about-photo-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
          >
            <img
              src="/profile-putra.png"
              alt="Hendrikwan Putra Zai"
              className="about-photo"
            />

            <div className="about-photo-info">
              <h3>Hendrikwan Putra Zai</h3>
              <p>Full-Stack Web Developer</p>
            </div>

            <div className="about-socials">
  <a href="mailto:hendrikwanputra@gmail.com" aria-label="Email">
    <FaEnvelope />
  </a>

  <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
    <FaLinkedinIn />
  </a>

  <a
  href="https://github.com/hendrikwanputra-prog"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaGithub />
</a>

  <a
    href="https://wa.me/6282163339515"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
  >
    <FaWhatsapp />
  </a>
</div>

<a href="/cv-hendrikwan-putra.pdf" download className="about-cv-btn">
  <FaDownload />
  Download CV
</a>
          </motion.div>

          <motion.div
            className="about-content-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: false }}
          >
           <p>
            Saya adalah lulusan Sistem Informasi yang berfokus pada pengembangan website dan aplikasi berbasis web. Saya memiliki ketertarikan dalam membangun sistem yang tidak hanya memiliki tampilan modern, tetapi juga mudah digunakan, responsif, dan sesuai dengan kebutuhan pengguna.
          </p>

          <p>
          Saya memiliki pengalaman dalam mengembangkan fitur CRUD, mengelola database, membangun antarmuka responsif, serta mengembangkan aplikasi menggunakan React, PHP, Laravel, MySQL, Tailwind CSS, dan Bootstrap. Saya terus mengembangkan kemampuan di bidang pengembangan aplikasi web dan solusi teknologi untuk menghasilkan sistem yang efektif dan fungsional.
          </p>

           <div className="about-info-grid">
            <div className="about-info-card">
              <div className="about-info-icon">
                <FaGraduationCap />
              </div>

              <div>
                <span>Education</span>
                <h4>Universitas Nusa Mandiri</h4>
              </div>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">
                <FaBookOpen />
              </div>

              <div>
                <span>Major</span>
                <h4>S1 Sistem Informasi</h4>
              </div>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">
                <FaCode />
              </div>

              <div>
                <span>Focus</span>
                <h4>Web Development</h4>
              </div>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">
                <FaRocket />
              </div>

              <div>
                <span>Status</span>
                <h4>Open to Opportunities</h4>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </motion.section>
       <motion.section
        id="skills"
        className="section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="section-header">
          <p>My Technical Skills</p>
          <h2>Skills</h2>
        </div>

        <div className="skills-categories">
          <motion.div
            className="skill-category"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="category-header">
              <span>01</span>
              <div>
                <h3>Frontend Development</h3>
                <p>Membangun tampilan website yang modern dan responsif.</p>
              </div>
            </div>

            <div className="category-skills">
              {[
                { name: 'HTML', icon: <FaHtml5 />, colorClass: 'html' },
                { name: 'CSS', icon: <FaCss3Alt />, colorClass: 'css' },
                { name: 'JavaScript', icon: <FaJs />, colorClass: 'javascript' },
                { name: 'React', icon: <FaReact />, colorClass: 'react' },
                { name: 'Bootstrap', icon: <FaBootstrap />, colorClass: 'bootstrap' },
                { name: 'Tailwind CSS', icon: <SiTailwindcss />, colorClass: 'tailwind' },
              ].map((skill, index) => (
                <motion.div
                  className={`skill-card ${skill.colorClass || ''}`}
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: false }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skill-category"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: false }}
          >
            <div className="category-header">
              <span>02</span>
              <div>
                <h3>Backend & Database</h3>
                <p>Mengelola sistem, proses data, dan database aplikasi.</p>
              </div>
            </div>

            <div className="category-skills">
              {[
                { name: 'PHP', icon: <FaPhp />, colorClass: 'php' },
                { name: 'Laravel', icon: <FaLaravel />, colorClass: 'laravel' },
                { name: 'MySQL', icon: <SiMysql />, colorClass: 'mysql' },
                { name: 'REST API', icon: <FaServer />, colorClass: 'api' },
                { name: 'CRUD System', icon: <FaDatabase />, colorClass: 'database' },
              ].map((skill, index) => (
                <motion.div
                  className={`skill-card ${skill.colorClass || ''}`}
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                   viewport={{ once: false }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skill-category"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            viewport={{ once: false }}
          >
            <div className="category-header">
              <span>03</span>
              <div>
                <h3>UI/UX Design</h3>
                <p>Merancang tampilan dan prototype aplikasi yang mudah digunakan.</p>
              </div>
            </div>

            <div className="category-skills">
              {[
                  { name: 'Figma', icon: <SiFigma />, colorClass: 'figma' },
                  { name: 'Wireframing', icon: <SiFigma />, colorClass: 'wireframe' },
                  { name: 'Prototyping', icon: <SiFigma />, colorClass: 'prototype' },
              ].map((skill, index) => (
                <motion.div
                  className={`skill-card ${skill.colorClass || ''}`}
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: false }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skill-category skill-category-tools"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="category-header">
              <span>04</span>
              <div>
                <h3>Tools & Workflow</h3>
                <p>Tools yang digunakan dalam proses pengembangan project.</p>
              </div>
            </div>

            <div className="category-skills">
              {[
                { name: 'GitHub', icon: <FaGithub />, colorClass: 'github' },
                { name: 'Vite', icon: <SiVite />, colorClass: 'vite' },
                { name: 'VS Code', icon: <VscCode />, colorClass: 'vscode' },

              ].map((skill, index) => (
                <motion.div
                  className={`skill-card ${skill.colorClass || ''}`}
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: false }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="section-header">
          <p>My Journey</p>
          <h2>Experience</h2>
        </div>

        <div className="experience-grid">
          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="experience-year">2026 - Present</div>
            <h3>Web Developer - Academic Project</h3>
            <h4>Sistem Rekam Medis Klinik Gigi</h4>
            <p>
              Mengembangkan aplikasi berbasis web untuk mengelola data pasien,
              dokter, rekam medis, diagnosa, tindakan, pembayaran, dan laporan
              klinik menggunakan Laravel, PHP, MySQL, dan Bootstrap.
            </p>
          </motion.div>

          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: false }}
          >
            <div className="experience-year">
              Oktober 2025 - Januari 2026
            </div>
            <h3>BMN Data Management Internship</h3>
            <h4>Kementerian Ekonomi Kreatif (EKRAF)</h4>
            <p>
              Mengelola data BMN melalui aplikasi SIMAN, melakukan input,
              pengecekan, pembaruan, dan verifikasi data aset berdasarkan
              dokumen pendukung, serta membantu penyusunan laporan data aset
              secara rapi dan terstruktur.
            </p>
          </motion.div>

          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            viewport={{ once: false }}
          >
            <div className="experience-year">
              September 2023 - Mei 2025
            </div>
            <h3>IT Support & Application Support</h3>
            <h4>OQ Clinic Dentist</h4>
            <p>
              Mendukung operasional klinik melalui troubleshooting aplikasi, perangkat komputer, dan jaringan dasar.
              Membantu staf dalam penggunaan sistem, pengelolaan data,
              serta memahami alur kerja klinik yang relevan dengan pengembangan sistem informasi berbasis web.
            </p>
          </motion.div>

          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            viewport={{ once: false }}
          >
            <div className="experience-year">
              Februari 2022 - Juni 2023
            </div>
            <h3>IT Support & Application Support</h3>
            <h4>PT Valche Pelita Indonesia</h4>
            <p>
              Memberikan dukungan teknis pada aplikasi operasional perusahaan, termasuk instalasi, konfigurasi, dan troubleshooting software.
              Membantu penggunaan Accurate untuk transaksi, stok, invoice, dan surat jalan,
              sehingga memahami kebutuhan sistem dalam proses bisnis.
            </p>
          </motion.div>
        </div>      
        </motion.section>

        <motion.section
        id="projects"
        className="section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="section-header">
          <p>Selected Works</p>
          <h2>Projects</h2>
        </div>

        <div className="projects-grid">
          <motion.div
            className="project-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
          >
            <div className="project-number">01</div>

            <div className="project-preview">
              <img
                src="/project-rekam-medis-main.png"
                alt="Dashboard Sistem Rekam Medis Klinik Gigi"
              />
            </div>

            <div className="project-content">
              <h3>Sistem Rekam Medis Klinik Gigi</h3>
              <p>
                Aplikasi web untuk membantu pengelolaan data pasien, dokter,
                rekam medis, diagnosa, tindakan, pembayaran, dan laporan klinik
                gigi. Sistem ini dibangun menggunakan Laravel, PHP, MySQL, dan
                Bootstrap dengan konsep CRUD dan multi-user.
              </p>

              <div className="project-features">
                <span>CRUD Pasien</span>
                <span>Data Dokter</span>
                <span>Rekam Medis</span>
                <span>Pembayaran</span>
                <span>Laporan</span>
                <span>Multi User</span>
              </div>

              <div className="tech-stack">
                <span>Laravel</span>
                <span>PHP</span>
                <span>MySQL</span>
                <span>Bootstrap</span>
              </div>

              <div className="project-links">
             <button
              type="button"
              className="project-btn"
              onClick={() => {
                setSelectedProject(projectDetails.rekamMedis)
                setSelectedImage(projectDetails.rekamMedis.gallery[0])
              }}
            >
              View Detail
            </button>
            <a
              href="https://github.com/hendrikwanputra-prog/rekam-medis-gigi"
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn outline"
            >
              GitHub
</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="project-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: false }}
          >
            <div className="project-number">02</div>

            <div className="project-preview">
              <img
                src="/portofolio/home.png"
                alt="Preview Website Portofolio Pribadi"
              />
            </div>

            <div className="project-content">
              <h3>Website Portofolio Pribadi</h3>
             <p>
              Website portofolio pribadi untuk menampilkan profil, pengalaman, skills,
              project, CV, kontak, serta fitur review pengunjung menggunakan Supabase.
            </p>

              <div className="project-features">
                <span>Responsive</span>
                <span>Animation</span>
                <span>Download CV</span>
                <span>Contact Link</span>
                <span>Dark UI</span>
                <span>Modern Layout</span>
              </div>

              <div className="tech-stack">
                <span>React</span>
                <span>Vite</span>
                <span>CSS</span>
                <span>Framer Motion</span>
              </div>

              <div className="project-links">
              <button
                type="button"
                className="project-btn"
                onClick={() => {
                  setSelectedProject(projectDetails.portofolio)
                  setSelectedImage(projectDetails.portfolio.gallery[0])
                }}
              >
                View Detail<p className="modal-description"></p>
              </button>
        <a
          href="https://github.com/hendrikwanputra-prog/portfolio-saya"
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn outline"
        >
          GitHub
        </a>
              </div>
            </div>
          </motion.div>
          
{/* Project 03 */}
{showAllProjects && (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    viewport={{ once: false }}
  >
    <div className="project-number">03</div>

    <div className="project-preview">
      <img
        src="/project-03/beranda.png.png"
        alt="Preview Company Profile OQ Clinic Dentist"
      />
    </div>

    <div className="project-content">
      <h3>Company Profile OQ Clinic Dentist</h3>

      <p>
        Website company profile OQ Clinic Dentist yang dirancang untuk
        menampilkan informasi layanan, dokter, teknologi, promo, kontak,
        dan booking secara modern dan responsif.
      </p>

      <div className="project-features">
        <span>Responsive</span>
        <span>Layanan Klinik</span>
        <span>Data Dokter</span>
        <span>Teknologi</span>
        <span>Promo</span>
        <span>Booking</span>
      </div>

      <div className="tech-stack">
        <span>Next.js</span>
        <span>React</span>
        <span>TypeScript</span>
        <span>CSS</span>
      </div>

      <div className="project-links">
        <button
          type="button"
          className="project-btn"
          onClick={() => {
            setSelectedProject(projectDetails.companyProfile)
            setSelectedImage(projectDetails.companyProfile.gallery[0])
          }}
        >
          View Detail
        </button>

     <a
  href="https://github.com/hendrikwanputra-prog/oqclinic-dentist"
  target="_blank"
  rel="noopener noreferrer"
  className="project-btn outline"
>
  GitHub
</a>
      </div>
    </div>
  </motion.div>
)}

</div>  {/* tutup projects-grid */}

{/* View All Projects */}
<div className="projects-more">
<button
  type="button"
  className="projects-more-btn"
  onClick={() => setShowAllProjects(!showAllProjects)}
>
  {showAllProjects ? (
    <>
      Show Less <span>↑</span>
    </>
  ) : (
    <>
      View All Projects <span>→</span>
    </>
  )}
</button>
</div>

</motion.section>

<motion.section
  id="contact"
  className="section contact-section"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false, amount: 0.2 }}
>
        <div className="section-header">
          <p>Get In Touch</p>
          <h2>Contact Me</h2>
        </div>

        <div className="contact-card">
          <p>
           Saya terbuka untuk peluang kerja, freelance, magang, maupun kolaborasi
           dalam pengembangan website dan aplikasi berbasis web.
          </p>

          <div className="contact-list">
            <a
              href="mailto:hendrikwanputra@gmail.com"
              className="contact-item"
            >
              <span className="contact-icon">
                <FaEnvelope />
              </span>

              <span className="contact-text">
                <strong>Email</strong>
                <small>hendrikwanputra@gmail.com</small>
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/hendrikwan-putra-287b37403"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span className="contact-icon">
                <FaLinkedinIn />
              </span>

              <span className="contact-text">
                <strong>LinkedIn</strong>
                <small>Connect with me</small>
              </span>
            </a>

            <a
              href="https://www.instagram.com/oneputraa_/"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span className="contact-icon">
                <FaInstagram />
              </span>

              <span className="contact-text">
                <strong>Instagram</strong>
                <small>@oneputraa_</small>
              </span>
            </a>

            <a
              href="https://wa.me/6282163339515"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span className="contact-icon">
                <FaWhatsapp />
              </span>

              <span className="contact-text">
                <strong>WhatsApp</strong>
                <small>Send a message</small>
              </span>
            </a>
          </div>
        </div>
      </motion.section>

          <motion.section
      id="reviews"
      className="section review-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-header">
        <p>Feedback & Testimonials</p>
        <h2>What People Say</h2>
      </div>

      <div className="review-layout">
        <motion.div
          className="review-form-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <div className="review-card-heading">
            <span className="review-heading-icon">
              <FaPaperPlane />
            </span>

            <div>
              <h3>Leave a Review</h3>
              <p>Bagikan pendapat atau pengalaman bekerja bersama saya.</p>
            </div>
          </div>

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="review-form-row">
              <div className="review-field">
                <label htmlFor="review-name">Name</label>
                <input
                id="review-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={reviewForm.name}
                onChange={handleReviewChange}
                required
              />
              </div>

              <div className="review-field">
                <label htmlFor="review-role">Role / Company</label>
                <input
                  id="review-role"
                  name="role"
                  type="text"
                  placeholder="Optional"
                  value={reviewForm.role}
                  onChange={handleReviewChange}
                />
              </div>
            </div>

            <div className="review-field">
              <label htmlFor="review-message">Review</label>
             <textarea
                id="review-message"
                name="message"
                rows="5"
                placeholder="Write your feedback..."
                value={reviewForm.message}
                onChange={handleReviewChange}
                required
              />
            </div>

            <div className="review-rating">
              <span>Rating</span>

            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={star <= reviewRating ? 'active' : ''}
                  onClick={() => {
                    setReviewRating(star)
                    setReviewStatus('')
                  }}
                  aria-label={`Rating ${star}`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
            </div>

           <button
            type="submit"
            className="review-submit-btn"
            disabled={isSubmittingReview}
          >
            <FaPaperPlane />
            {isSubmittingReview ? 'Sending...' : 'Submit Review'}
          </button>
            {reviewStatus && (
              <p className="review-status">
                {reviewStatus}
              </p>
            )}
            <small className="review-note">
              Review akan ditampilkan setelah disetujui.
            </small>
          </form>
        </motion.div>

        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: false }}
        >
          <div className="review-card-heading">
            <span className="review-heading-icon">
              <FaQuoteLeft />
            </span>

            <div>
              <h3>Approved Reviews</h3>
              <p>Review asli yang telah disetujui akan tampil di sini.</p>
            </div>
          </div>

          {isLoadingReviews ? (
            <div className="testimonial-empty">
              <FaQuoteLeft />
              <h4>Loading reviews...</h4>
            </div>
          ) : approvedReviews.length === 0 ? (
            <div className="testimonial-empty">
              <FaQuoteLeft />
              <h4>No reviews yet</h4>
              <p>
                Jadilah orang pertama yang memberikan feedback untuk portofolio ini.
              </p>
            </div>
          ) : (
            <div className="approved-review-list">
              {approvedReviews.map((review) => (
                <article className="approved-review-item" key={review.id}>
                  <div className="approved-review-top">
                    <div>
                      <h4>{review.name}</h4>
                      <span>{review.role || 'Portfolio Reviewer'}</span>
                      <small>
                        {new Date(review.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </small>
                    </div>

                    <div className="approved-review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={star <= review.rating ? 'active' : ''}
                        />
                      ))}
                    </div>
                  </div>

                  <p>{review.message}</p>
                </article>
              ))}
            </div>
          )}
                  </motion.div>
      </div>
    </motion.section>
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <p className="modal-label">Project Detail</p>
            <h2>{selectedProject.title}</h2>

            <div className="modal-info">
              <span>Role: {selectedProject.role}</span>
              <span>Status: {selectedProject.status}</span>
            </div>

            {selectedProject.gallery?.length > 0 && (
            <div className="project-gallery">
              <div className="gallery-main">
                <img
                  src={selectedImage || selectedProject.gallery[0]}
                  alt={`Preview ${selectedProject.title}`}
                />
              </div>

              <div className="gallery-thumbnails">
                {selectedProject.gallery.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    className={
                      selectedImage === image
                        ? 'gallery-thumbnail active'
                        : 'gallery-thumbnail'
                    }
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Lihat screenshot ${index + 1}`}
                  >
                    <img src={image} alt={`Screenshot ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
            <p className="modal-description">
              {selectedProject.description}
            </p>

            <h3>Main Features</h3>
            <div className="modal-list">
              {selectedProject.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>

            <h3>Tech Stack</h3>
            <div className="modal-tech">
              {selectedProject.tech.map((item) => (
                <span key={item}>
                  {getTechIcon(item)}
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      {showScrollTop && (
      <motion.button
        type="button"
        className="scroll-top-btn"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
      >
        <FaArrowUp />
      </motion.button>
    )}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <p>© 2026 Hendrikwan Putra Zai. All rights reserved.</p>
      </motion.footer>
    </div>
  )
}

export default App