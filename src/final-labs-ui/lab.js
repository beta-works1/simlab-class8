import { animate } from 'motion/mini'

const root = document.documentElement
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
const active = new Map()
const find = (selector) => document.querySelector(selector)
if (find('#tray') && find('#presets')) root.classList.add('lab-circuit')
const strings = {
  en: { collection: 'Class 8 science', home: 'Back to the twelve science labs' },
  ur: { collection: 'جماعت ہشتم سائنس', home: 'بارہ سائنسی تجربات کی طرف واپس جائیں' },
}

function motion(element, frames, duration = .24) {
  if (!element || reduced.matches || !element.getClientRects().length) return
  active.get(element)?.cancel()
  const animation = animate(element, frames, { duration, ease: [.2,.75,.25,1] })
  active.set(element, animation)
  animation.then(() => {
    if (active.get(element) === animation) {
      animation.cancel()
      active.delete(element)
    }
  })
}

reduced.addEventListener('change', () => {
  if (reduced.matches) {
    active.forEach((animation) => animation.cancel())
    active.clear()
  }
})

const topbar = document.createElement('div')
topbar.className = 'lab-topbar'
const home = document.createElement('a')
home.className = 'lab-home'
home.href = window.self !== window.top
  ? '/simulations?grade=8&chapter=final-pctb-labs'
  : './index.html'
if (window.self !== window.top) home.target = '_top'
home.innerHTML = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="3" fill="currentColor"/><ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" stroke-width="1.8" transform="rotate(-40 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" stroke-width="1.8" transform="rotate(40 16 16)"/></svg><span>SimLab</span>'
const collection = document.createElement('span')
collection.className = 'lab-collection'
topbar.append(home, collection, find('.nav'))
find('.wrap').prepend(topbar)
function localize() {
  const text = strings[root.lang] || strings.en
  collection.textContent = text.collection
  home.setAttribute('aria-label', text.home)
}
localize()
new MutationObserver(localize).observe(root, { attributes: true, attributeFilter: ['lang'] })

function revealScreen() {
  motion(find('.screen.on'), { opacity: [.65,1], transform: ['translateY(5px)','translateY(0)'] })
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return
  const isMode = !!button.closest('#modeTray, #viewTray')
  requestAnimationFrame(() => {
    if (isMode || button.id === 'btnLang') labelRanges()
    if (isMode) {
      motion(find('.stage__inner'), { opacity: [.45,1] }, .2)
      motion(find('#modeOpts'), { opacity: [.5,1] }, .2)
    } else if (button.id === 'navBench' || button.id === 'navQuiz' || button.id === 'gNext') {
      revealScreen()
    } else if (button.id === 'btnReset') {
      motion(button.querySelector('svg'), { transform: ['rotate(-140deg)','rotate(0deg)'] }, .3)
    } else if (button.classList.contains('opt')) {
      motion(button.closest('.q')?.querySelector('.fb.show'), { opacity: [0,1], transform: ['translateY(-4px)','translateY(0)'] }, .2)
    } else if (button.id === 'gShow') {
      motion(find('.stage__inner'), { opacity: [.55,1] }, .24)
    }
  })
}, true)

let task = find('#gTask')?.textContent
let done = find('#guide')?.classList.contains('done')
const taskObserver = new MutationObserver(() => {
  const guide = find('#guide')
  const nextTask = find('#gTask')?.textContent
  const nextDone = guide.classList.contains('done')
  if (nextTask !== task || nextDone !== done) {
    motion(guide.querySelector('.guide__badge'), { transform: ['scale(.94)','scale(1)'], opacity: [.65,1] }, .28)
    task = nextTask
    done = nextDone
  }
})
taskObserver.observe(find('#guide'), { attributes: true, attributeFilter: ['class'] })
taskObserver.observe(find('#gTask'), { childList: true, subtree: true, characterData: true })

function labelRanges() {
  for (const range of document.querySelectorAll('input[type="range"]')) {
    if (range.hasAttribute('data-lab-ui-label') || (!range.getAttribute('aria-label') && !range.labels?.length)) {
      const label = range.closest('.row')?.querySelector('label')
      if (label) {
        range.setAttribute('aria-label', label.textContent.trim())
        range.setAttribute('data-lab-ui-label', '')
      }
    }
  }
}
labelRanges()

requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
