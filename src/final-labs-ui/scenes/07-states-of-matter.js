drawBeaker = function(box, open) { art.glass(box.x, box.y + (open ? 20 : 0), box.w, box.h - (open ? 20 : 0)) }
drawDots = function(th) {
  const counts = countsOf(th)
  ctx.save()
  const cold = css('--cold'), liquid = css('--accent'), gas = css('--warm')
  for (let i = 0; i < S.pts.length; i++) {
    const p = S.pts[i], solid = i < counts.nS, fluid = i < counts.nS + counts.nL
    ctx.globalAlpha = p.esc ? 1 - p.esc : 1
    art.bead(p.x, p.y, solid || fluid ? 5 : 3.6, solid ? cold : fluid ? liquid : gas)
  }
  ctx.restore()
}
const plainThermometer = drawThermometer
drawThermometer = function(temp, min, max, x, y) {
  plainThermometer(temp, min, max, x, y)
  ctx.save(); art.line(x + 2, y + 8, x + 2, y + 243, '#ffffffb0', 2)
  for (let i = 0; i < 8; i++) art.line(x + 18, y + 10 + i * 31, x + 22, y + 10 + i * 31, '#8396a7', 1)
  art.ellipse(x + 4, y + 263, 3, 4, '#ffffff80'); ctx.restore()
}
flameAt = function(x, y, power) {
  if (power <= .02) return
  art.flame(x, y + 6, 18 * power, 46 * power, S.tSim)
}
const plainEvaporation = drawEvap
drawEvap = function() {
  plainEvaporation()
  art.glass(80, 220, lerp(120, 280, S.evap.area), 90, false)
}
