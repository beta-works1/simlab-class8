const artReduced = matchMedia('(prefers-reduced-motion: reduce)')
const artSprites = new Map()
const artTweens = new WeakMap()
const art = {
  ink: '#263e57',
  gradient(x, y, w, h, colors) {
    const g = ctx.createLinearGradient(x, y, x + w, y + h)
    for (let i = 0; i < colors.length; i++) g.addColorStop(i / (colors.length - 1), colors[i])
    return g
  },
  round(x, y, w, h, r, fill, stroke = null, line = 2) {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r)
    if (fill) { ctx.fillStyle = fill; ctx.fill() }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke() }
  },
  line(x1, y1, x2, y2, color, width = 2) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke()
  },
  ellipse(x, y, rx, ry, fill, stroke = null, width = 2) {
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
    if (fill) { ctx.fillStyle = fill; ctx.fill() }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke() }
  },
  shadow(x, y, w, h = 6) { this.ellipse(x, y, w, h, 'rgba(35,62,87,.13)') },
  bead(x, y, r, color) {
    let sprite = artSprites.get(color)
    if (!sprite) {
      sprite = document.createElement('canvas'); sprite.width = sprite.height = 48
      const g = sprite.getContext('2d')
      g.beginPath(); g.arc(24, 24, 21, 0, Math.PI * 2); g.fillStyle = color; g.fill()
      const light = g.createRadialGradient(17, 14, 1, 24, 24, 25)
      light.addColorStop(0, 'rgba(255,255,255,.78)'); light.addColorStop(.5, 'rgba(255,255,255,0)'); light.addColorStop(1, 'rgba(22,42,62,.45)')
      g.fillStyle = light; g.fill(); g.strokeStyle = 'rgba(20,40,60,.2)'; g.lineWidth = 2; g.stroke()
      artSprites.set(color, sprite)
    }
    ctx.drawImage(sprite, x - r * 1.14, y - r * 1.14, r * 2.28, r * 2.28)
  },
  glass(x, y, w, h, ticks = true) {
    ctx.save()
    this.shadow(x + w / 2, y + h + 5, w * .49, Math.min(8, w * .04))
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y + h - 10)
    ctx.quadraticCurveTo(x + w / 2, y + h + 10, x + w - 3, y + h - 10)
    ctx.lineTo(x + w, y); ctx.strokeStyle = '#6b9cae'; ctx.lineWidth = 3; ctx.stroke()
    this.ellipse(x + w / 2, y, w / 2, Math.min(9, w * .06), 'rgba(213,241,249,.15)', '#8fb7c5', 2)
    this.line(x + w * .09, y + 17, x + w * .11, y + h * .79, 'rgba(255,255,255,.75)', Math.max(3, w * .018))
    this.line(x + w * .91, y + h * .28, x + w * .9, y + h * .88, 'rgba(99,164,188,.23)', 3)
    if (ticks) for (let i = 1; i < 6; i++) this.line(x + w * .74, y + h * i / 7, x + w * (i % 2 ? .82 : .87), y + h * i / 7, 'rgba(60,112,135,.5)', 1.5)
    ctx.restore()
  },
  flame(x, y, w, h, time = 0) {
    if (h <= 1) return
    const bend = artReduced.matches ? 0 : Math.sin(time * 9) * w * .15
    ctx.save()
    const glow = ctx.createRadialGradient(x, y - h * .35, 1, x, y - h * .35, h * .72)
    glow.addColorStop(0, 'rgba(255,179,56,.22)'); glow.addColorStop(1, 'rgba(255,179,56,0)')
    this.ellipse(x, y - h * .35, h * .72, h * .72, glow)
    ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x - w, y - h * .15, x - w * .15, y - h * .72, x + bend, y - h)
    ctx.bezierCurveTo(x + w * .2, y - h * .5, x + w, y - h * .22, x, y)
    ctx.fillStyle = this.gradient(x, y - h, 0, h, ['#ffe49b', '#ffae3d', '#ee6748']); ctx.fill()
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x - w * .55, y - h * .15, x, y - h * .61)
    ctx.quadraticCurveTo(x + w * .55, y - h * .15, x, y); ctx.fillStyle = '#fff4b6'; ctx.fill()
    ctx.restore()
  },
  follow(key, target) {
    const now = performance.now()
    let entry = artTweens.get(key)
    if (!entry) { entry = { value: target, time: now }; artTweens.set(key, entry) }
    entry.value = artReduced.matches ? target : entry.value + (target - entry.value) * (1 - Math.exp(-Math.min(.1, (now - entry.time) / 1000) * 22))
    entry.time = now
    return entry.value
  },
}
Object.freeze(art)
