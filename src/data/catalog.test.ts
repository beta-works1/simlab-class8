import { describe, expect, it } from 'vitest'
import { catalogSimulations, getRelatedSimulations, getSimulationById, searchCatalog, simulations } from './simulations'
import { SUBJECT_GROUPS } from './subjects'

describe('public Class 8 collection and preserved archive', () => {
  it('publishes exactly the twelve standalone final labs', () => {
    const finalLabs = simulations.filter((sim) => sim.chapter === 'Final PCTB Labs')
    expect(catalogSimulations).toHaveLength(12)
    expect(new Set(catalogSimulations.map((sim) => sim.id))).toEqual(new Set(finalLabs.map((sim) => sim.id)))
    expect(catalogSimulations.every((sim) => sim.grade === 8 && sim.sceneryHtml?.startsWith('/final-sims/'))).toBe(true)
  })

  it('keeps older records resolvable while excluding them from search and recommendations', () => {
    const archived = simulations.filter((sim) => !catalogSimulations.includes(sim))
    expect(archived.length).toBeGreaterThan(0)
    for (const sim of archived) {
      expect(getSimulationById(sim.id)).toBe(sim)
      expect(getRelatedSimulations(sim).every((item) => catalogSimulations.includes(item))).toBe(true)
    }
    expect(searchCatalog('global warming')).toEqual([])
    expect(searchCatalog('fraction')).toEqual([])
    expect(searchCatalog('  CIRCUIT  ').map((sim) => sim.id)).toContain('final-circuit-construction-kit')
    expect(searchCatalog('')).toEqual(catalogSimulations)
  })

  it('groups every public lab once, with no archived subject examples', () => {
    const subjectIds = SUBJECT_GROUPS.flatMap((subject) => subject.items.map((sim) => sim.id))
    expect(subjectIds).toHaveLength(12)
    expect(new Set(subjectIds)).toEqual(new Set(catalogSimulations.map((sim) => sim.id)))
    expect(SUBJECT_GROUPS.map((subject) => subject.count)).toEqual([6, 2, 3, 1])
  })
})
