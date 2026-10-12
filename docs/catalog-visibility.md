# Public catalog and archived simulations

The public site shows only the twelve Final PCTB Class 8 labs. Homepage examples,
subject counts, navigation, search, and related recommendations use
`catalogSimulations` in `src/data/simulations.ts`.

The full `simulations` array, simulation registries, models, assets, offline
files, and older lesson implementations remain in this repository. Archived
records are still resolved by `getSimulationById`; an existing `/run/<id>` or
`/play/<id>` link can open one directly. The legacy `/gs8` workspace is also
retained without a link in the public navigation.

To publish an archived simulation again, add its existing ID to
`PUBLIC_SIMULATION_IDS`. Add that ID to a subject's `simulationIds` in
`src/data/subjects.ts` if it should appear under that subject. Update the
collection copy and catalog regression tests when changing the intended count.
No archived data needs to be recovered or recreated.

Historic catalog grade/chapter query strings now show the curated twelve-lab
collection; they cannot expose archived cards. Search and subject queries filter
only that collection.
