import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { SUBJECT_GROUPS } from '../data/subjects'
import './Footer.css'

export function Footer() {
  const reduce = useReducedMotion()

  return (
    <motion.footer
      id="page-footer"
      className="ltr site-footer"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-band">
        <p className="footer-brand">SimLab</p>
        <p className="footer-tagline">
          Twelve free Class 8 science labs. Open an experiment and learn through exploration.
        </p>
      </div>

      <div className="main-footer">
        <div className="footer-content">
          <nav className="footer-links" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/simulations">Simulations</Link>
            {SUBJECT_GROUPS.map((subject) => (
              <Link key={subject.id} to={subject.href}>
                {subject.name}
              </Link>
            ))}
            <Link to="/about">About</Link>
          </nav>

          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} SimLab Interactive Simulations
          </p>
          <p className="footer-powered">Powered by Beta Works</p>
        </div>
      </div>
    </motion.footer>
  )
}
