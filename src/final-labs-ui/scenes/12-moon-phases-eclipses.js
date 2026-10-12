drawEarth = function(x, y, r) {
  ctx.save(); ctx.translate(x, y)
  const ocean = ctx.createRadialGradient(-r * .4, -r * .5, r * .08, 0, 0, r * 1.2)
  ocean.addColorStop(0, '#8dcde8'); ocean.addColorStop(.5, '#3885b9'); ocean.addColorStop(1, '#245381')
  art.ellipse(0, 0, r, r, ocean, '#709caf', 1.4)
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip(); ctx.scale(r, r)
  ctx.fillStyle = '#8eb87b'
  ctx.beginPath(); ctx.moveTo(-.8, -.65); ctx.lineTo(-.42, -.85); ctx.lineTo(-.1, -.69); ctx.lineTo(-.23, -.42); ctx.lineTo(-.05, -.12); ctx.lineTo(-.3, .08); ctx.lineTo(-.45, -.19); ctx.lineTo(-.67, -.24); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(-.26, .13); ctx.lineTo(.02, .2); ctx.lineTo(.05, .5); ctx.lineTo(-.26, .87); ctx.lineTo(-.33, .51); ctx.lineTo(-.46, .26); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(.33, -.74); ctx.lineTo(.88, -.52); ctx.lineTo(.78, -.15); ctx.lineTo(.46, -.2); ctx.lineTo(.35, .16); ctx.lineTo(.2, -.05); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#c7dfa5'; ctx.beginPath(); ctx.ellipse(-.38, -.54, .18, .1, -.2, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#ffffff75'; ctx.lineWidth = .055; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(-.8, .08); ctx.quadraticCurveTo(-.6, -.03, -.5, .02); ctx.moveTo(.05, -.53); ctx.quadraticCurveTo(.2, -.65, .4, -.56); ctx.stroke()
  ctx.fillStyle = '#14253570'; ctx.fillRect(0, -1, 1, 2)
  ctx.restore()
}
const plainMoonTop = drawMoonTop
drawMoonTop = function(x, y, r, theta) {
  plainMoonTop(x, y, r, theta)
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip()
  ctx.translate(x, y); ctx.rotate(Math.atan2(EARTH.y - y, EARTH.x - x))
  for (let i = 0; i < 7; i++) {
    const a = i * 2.4, radial = (.25 + (i % 3) * .2) * r, rr = r * (.065 + i % 2 * .035)
    art.ellipse(Math.cos(a) * radial, Math.sin(a) * radial, rr, rr * .75, '#1d304028', '#17263325', .5)
  }
  ctx.restore()
}
const plainMoonSphere = drawMoonSphere
drawMoonSphere = function(g, cx, cy, r, theta, lunar) {
  plainMoonSphere(g, cx, cy, r, theta, lunar)
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.clip()
  g.fillStyle = 'rgba(20,30,43,.14)'; g.strokeStyle = 'rgba(20,30,43,.1)'; g.lineWidth = .6
  for (let i = 0; i < 12; i++) {
    const a = i * 2.399, rad = Math.sqrt((i + 1) / 14) * r * .8, size = r * (.04 + i % 3 * .018)
    g.beginPath(); g.ellipse(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, size, size * .85, .2, 0, Math.PI * 2); g.fill(); g.stroke()
  }
  g.restore()
}
const plainSun = drawSun
drawSun = function() {
  plainSun(); ctx.save()
  const r = CONFIG.SUN_R
  art.ellipse(SUN.x, SUN.y, r - 1, r - 1, art.gradient(SUN.x - r, SUN.y - r, r * 2, r * 2, ['#fff2a8', '#ffd06b', '#f1a24b']))
  ctx.globalAlpha = .2
  for (let i = 0; i < 14; i++) {
    const a = i * 2.399, rad = Math.sqrt((i + 1) / 16) * r * .8
    art.ellipse(SUN.x + Math.cos(a) * rad, SUN.y + Math.sin(a) * rad, 2 + i % 3, 1.5 + i % 2, '#cd733c')
  }
  ctx.restore()
}
