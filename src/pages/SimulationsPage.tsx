import { useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PageMeta } from '../components/PageMeta'
import { SimulationGrid } from '../components/SimulationGrid'
import { catalogSimulations, searchCatalog } from '../data/simulations'
import { SUBJECT_GROUPS } from '../data/subjects'
import './SimulationsPage.css'

export function SimulationsPage() {
  const reduce = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const subject = SUBJECT_GROUPS.find((item) => item.id === searchParams.get('subject'))
  // Historic grade/chapter URLs resolve to this same curated collection.
  const sims = searchCatalog(query).filter((sim) => !subject || subject.simulationIds.includes(sim.id))

  function selectSubject(id?: string) {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query)
    if (id) params.set('subject', id)
    setSearchParams(params)
  }

  return (
    <div className="simulations-page page-content">
      <PageMeta
        title="Class 8 Science Labs"
        description="Explore twelve interactive Class 8 PCTB science labs, from circuits and chemistry to the human body and Moon phases."
        path="/simulations"
      />
      <motion.header
        className="simulations-header"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1>Your science lab, ready to explore.</h1>
        <p>{catalogSimulations.length} Class 8 PCTB simulations. Pick an experiment, change something, and see what happens.</p>
      </motion.header>

      <div className="catalog-tools">
        <div className="catalog-subjects" role="group" aria-label="Filter by subject">
          <button type="button" aria-pressed={!subject} onClick={() => selectSubject()}>All labs</button>
          {SUBJECT_GROUPS.map((item) => (
            <button key={item.id} type="button" aria-pressed={subject?.id === item.id} onClick={() => selectSubject(item.id)}>
              {item.name} <span>{item.count}</span>
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <span>Find an experiment</span>
          <input
            type="search"
            placeholder="Try circuits, light, or plants"
            value={query}
            onChange={(event) => {
              const params = new URLSearchParams()
              if (subject) params.set('subject', subject.id)
              if (event.target.value) params.set('q', event.target.value)
              setSearchParams(params, { replace: true })
            }}
          />
        </label>
      </div>

      <section className="catalog-results" aria-label="Simulation results">
        <p className="catalog-count" role="status">
          {sims.length} {sims.length === 1 ? 'lab' : 'labs'}{subject ? ` in ${subject.name}` : ''}
          {query.trim() ? ` matching “${query.trim()}”` : ''}
        </p>
        {sims.length > 0 ? <SimulationGrid items={sims} showTags /> : (
          <div className="grade-empty">
            <p>No labs match these filters. Try a different word or browse all {catalogSimulations.length} labs.</p>
            <button className="btn btn-primary" type="button" onClick={() => setSearchParams({})}>Show all labs</button>
          </div>
        )}
      </section>
    </div>
  )
}
