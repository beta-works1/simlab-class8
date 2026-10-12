import { catalogSimulations, type Grade, type Simulation } from './simulations'

export interface Subject {
  id: string
  name: string
  blurb: string
  accent: string
  accentInk: string
  simulationIds: string[]
}

const SUBJECT_DEFS: Subject[] = [
  {
    id: 'physics', name: 'Physics',
    blurb: 'Build a circuit, bend light, and put forces, heat and sound to the test.',
    accent: '--gas-300', accentInk: '--gas-ink',
    simulationIds: [
      'final-circuit-construction-kit', 'final-ray-optics-bench',
      'final-force-pressure-fluids', 'final-heat-transfer-equilibrium',
      'final-sound-vibration-pitch', 'final-simple-machines',
    ],
  },
  {
    id: 'chemistry', name: 'Chemistry',
    blurb: 'Mix acids and bases, then explore how particles change state.',
    accent: '--ember-400', accentInk: '--ember-ink',
    simulationIds: ['final-ph-neutralisation-lab', 'final-states-of-matter'],
  },
  {
    id: 'biology', name: 'Biology',
    blurb: 'Follow a nerve signal, trace blood flow, and see a plant exchange gases.',
    accent: '--sage-500', accentInk: '--sage-ink',
    simulationIds: [
      'final-reflex-arc-nerve-signal', 'final-photosynthesis-gas-exchange',
      'final-circulatory-system',
    ],
  },
  {
    id: 'earth-space', name: 'Earth & Space',
    blurb: 'Move around the Earth to discover Moon phases and eclipses.',
    accent: '--sun-500', accentInk: '--sun-ink',
    simulationIds: ['final-moon-phases-eclipses'],
  },
]

export interface SubjectGroup extends Subject {
  href: string
  items: Simulation[]
  count: number
  grades: Grade[]
}

/** Public UI only: archived records never contribute examples or counts. */
export const SUBJECT_GROUPS: SubjectGroup[] = SUBJECT_DEFS.map((def) => {
  const items = catalogSimulations.filter((sim) => def.simulationIds.includes(sim.id))
  return {
    ...def,
    href: `/simulations?subject=${def.id}`,
    items,
    count: items.length,
    grades: [...new Set(items.map((sim) => sim.grade))].sort((a, b) => a - b),
  }
}).filter((subject) => subject.count > 0)
