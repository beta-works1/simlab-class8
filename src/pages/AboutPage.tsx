import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PageMeta } from '../components/PageMeta'
import './AboutPage.css'

const ease = [0.22, 1, 0.36, 1] as const

export function AboutPage() {
  const reduce = useReducedMotion()

  return (
    <div className="about-page page-content">
      <PageMeta
        title="About SimLab"
        description="Learn about the twelve Class 8 PCTB science labs in SimLab."
        path="/about"
      />

      <motion.header
        className="about-header"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <p className="about-kicker">About</p>
        <h1>About SimLab</h1>
        <p>
          SimLab brings twelve Class 8 PCTB science labs to your browser. Explore physics, chemistry,
          biology, and Earth & Space through interactive experiments.
        </p>
        <p>Powered by Beta Works.</p>
      </motion.header>

      <motion.section
        className="about-section"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease }}
      >
        <h2>How it works</h2>
        <ol className="workflow-steps">
          <li>
            <strong>Explore the labs</strong> — browse all twelve experiments or filter by subject.
          </li>
          <li>
            <strong>Pick an experiment</strong> — open a lab to see its controls and learning goals.
          </li>
          <li>
            <strong>Try a change</strong> — adjust a control, observe the result, and test your understanding.
          </li>
        </ol>
      </motion.section>

      <motion.section
        className="about-section"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
      >
        <h2>Learn at your own pace</h2>
        <p>
          Repeat an experiment, switch between English and Urdu, or download a lab to explore offline.
          Each lab keeps its controls, explanations, and quizzes together.
        </p>
        <div className="about-actions">
          <Link to="/simulations" className="btn btn-primary">
            Explore simulations
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
