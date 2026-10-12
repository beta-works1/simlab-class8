drawFlame = function(g) {
  const x = g.flame.x, y = g.flame.y
  ctx.save()
  art.shadow(x, y + 22, 18, 4)
  art.round(x - 12, y - 8, 24, 28, 5, art.gradient(x - 12, 0, 24, 0, ['#cf9459', '#ffe0a1', '#c58551']), '#9c6844', 1.5)
  art.flame(x, y - 8, 15, 48)
  label(T('stimulus'), x, y + 32, { size: 12, fill: css('--hot'), bold: true })
  ctx.restore()
}
const plainBody = drawBody
drawBody = function(g) {
  plainBody(g)
  ctx.save()
  ctx.beginPath(); ctx.ellipse(g.brain.x, g.brain.y, 21, 15, -.3, 0, Math.PI * 2); ctx.clip()
  ctx.fillStyle = art.gradient(g.brain.x, g.brain.y - 15, 0, 30, ['#ffffff55', '#ffffff00', '#9a647425']); ctx.fill()
  ctx.strokeStyle = css('--aware'); ctx.globalAlpha = .55; ctx.lineWidth = 1.4
  for (let i = 0; i < 4; i++) {
    const x = g.brain.x - 14 + i * 8
    ctx.beginPath(); ctx.moveTo(x, g.brain.y - 10); ctx.bezierCurveTo(x - 8, g.brain.y - 2, x + 8, g.brain.y + 2, x, g.brain.y + 11); ctx.stroke()
  }
  ctx.restore()
  ctx.save()
  art.line(g.shoulder.x - 2, g.shoulder.y - 2, g.elbow.x - 2, g.elbow.y - 2, '#ffffff60', 3)
  art.line(g.elbow.x - 2, g.elbow.y - 2, g.wrist.x - 2, g.wrist.y - 2, '#ffffff60', 3)
  for (let i = 0; i < 6; i++) art.line(g.cord.x - 9, g.cord.top + 18 + i * 22, g.cord.x + 9, g.cord.top + 18 + i * 22, '#ffffff60', 2)
  ctx.restore()
}
drawPulse = function(pt, color) {
  ctx.save()
  const glow = ctx.createRadialGradient(pt.x, pt.y, 2, pt.x, pt.y, 15)
  glow.addColorStop(0, '#ffffffa0'); glow.addColorStop(1, '#ffffff00')
  art.ellipse(pt.x, pt.y, 15, 15, glow); art.bead(pt.x, pt.y, 7, color)
  ctx.restore()
}
