# Final PCTB Labs UI

Shared presentation and motion for the twelve standalone files in `public/final-sims/`.

## Edit and build

Edit `lab.css` and `lab.js` for the interface, or `scenes/` for the illustrated apparatus, then run:

```sh
npm run build:final-ui
npm run test:final-ui
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 5173
```

Commit the generated HTML with the source changes. The main build serves those checked-in files; it does not regenerate this layer automatically.

`build:final-ui` bundles the existing `motion/mini` dependency and the per-lab scene artwork into each HTML file and replaces only the marked UI blocks. Downloaded labs remain self-contained, with no CDN or new network dependency. Motion's MIT license is embedded with the bundle. No additional runtime package was added.

## Scope and preservation

The interface layer changes typography, colors, layout, navigation placement, controls, focus states, and short UI transitions. It moves the existing navigation nodes so their original event handlers survive. Stage transitions use opacity to avoid disturbing canvas pointer coordinates.

The illustration layer replaces or decorates drawing functions through a separate classic script. It reads the original state and drawing arguments, without changing calculations, state, quiz content, controllers, or the animation loop. It keeps interaction coordinates and scientific color meanings. The original source scripts remain byte-for-byte unchanged, while selected rendering functions are intentionally replaced at runtime.

`core-baseline.json` records the SHA-256 hashes of the original scripts at commit `4e1b673da1f50dd9a60f078f32e017dff2dec774`. `test:final-ui` verifies those scripts remain unchanged, each UI/illustration block appears once, scripts are embedded, and each lab stays below 2 MB. It checks illustration syntax, rejects direct assignments to `S` or `CONFIG`, and rejects extra timers or animation loops. This static check does not replace browser interaction checks. Do not update the baseline for a presentation-only change.

The launcher suppresses its overlapping Catalog link only for these labs. The new SimLab link returns embedded labs to the filtered collection; standalone pages return to their adjacent index.

## Motion and accessibility

Transitions are 200–300 ms and use opacity/transform. Repeated transitions cancel previous UI animations. The layer observes task changes, rather than continuously changing readings. It respects `prefers-reduced-motion`, retains English/Urdu and bright/dim modes, and adds localized accessible names to otherwise unlabeled sliders.

Apparatus animation runs inside the existing draw loop. Drum and speaker displacement, particle positions, heart phase, oxygen bubbles, and orbital position come from the original state. Flame motion follows simulation time; pulley spokes follow rope travel. The new decorative motion stops for reduced motion. Switch interpolation is a short visual response to opening/closing the existing switch. Particle sprites are cached; switch interpolation uses a WeakMap so removed components can be collected.

## Illustrated scenes

| Lab | Artwork |
| --- | --- |
| Circuit | Batteries, glowing glass bulbs, switches, resistors, fuses, meters, matching tray icons; original Symbols view retained |
| Optics | Bench lamps, metallic mirrors, candles |
| Force and pressure | Shoes and boards, glass tanks, hydraulic car, straw glass |
| pH | Beaker rims, reflections, liquid menisci, graduations |
| Reflex arc | Candle, brain folds, limb highlights, nerve pulses |
| Heat | Material-specific rod edges, glass convection vessel, flame, metal pot and handles |
| Matter | Glass vessels, shaded particles, thermometer, flame |
| Sound | Constructed drum, vibrating speaker cone |
| Photosynthesis | Leaf cells and chloroplasts, aquatic plant, transparent oxygen bubbles |
| Simple machines | Wooden loads, green fulcrum, metal pulley wheels that turn with rope travel |
| Circulation | Heart shading, branching lungs, blood-cell textures |
| Moon | Illustrated Earth, crater texture, Sun surface; original phase and shadow geometry retained |

## Research

- [Motion mini](https://motion.dev/docs/quick-start): selected because the repository already includes Motion and mini supports lightweight DOM animation.
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API): browser foundation for these transitions.
- [GSAP](https://gsap.com/pricing/), [Anime.js](https://animejs.com/documentation/), and [Lottie](https://github.com/airbnb/lottie-web): reviewed alternatives; no second animation system or exported decorative animation was needed.
- [Lucide license](https://lucide.dev/license): reviewed free icon option; existing science symbols and an original small SVG logo were sufficient.
- Free skills installed locally: [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) and [Motion](https://github.com/motiondivision/ai-kit).

## Verification

Production build, TypeScript, focused lint, and all 93 existing tests passed. Browser checks covered all 12 labs, their available mode switches, reset, Bench/Quiz navigation, quiz feedback, and English/Urdu. All 12 were checked at 360 px with no page-level horizontal overflow in either language, and at 768 px tablet width. Circuit Show me produced a working loop and live readings. Reduced-motion support was checked in the code; an OS preference override was not exercised.

After the illustration pass, every mode and reset were checked again, with no browser errors. All 12 were rechecked at 360 px in English and Urdu/dim mode. The illustrated drum was exercised with Strike, Pause, and Step. Source integrity, TypeScript, focused lint, production build, and all 93 existing tests passed again.
