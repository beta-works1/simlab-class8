const plainFoot = drawFootShape
drawFootShape = function(id, cx, cy, area, yBase) {
  const w = visWidth(area)
  ctx.save()
  if (id === 'shoe') {
    art.shadow(cx, cy + 7, w * .5, 4)
    ctx.beginPath(); ctx.moveTo(cx - w / 2, cy + 2); ctx.lineTo(cx - w / 2, cy - 18)
    ctx.quadraticCurveTo(cx - w * .2, cy - 23, cx, cy - 9)
    ctx.quadraticCurveTo(cx + w * .49, cy - 15, cx + w / 2, cy + 2); ctx.closePath()
    ctx.fillStyle = art.gradient(cx, cy - 22, 0, 26, ['#80a8ed', '#3d6db5']); ctx.fill(); ctx.strokeStyle = art.ink; ctx.lineWidth = 2; ctx.stroke()
    art.round(cx - w / 2, cy + 1, w, 6, 3, '#f9edd5', art.ink, 1.5)
    for (let i = 0; i < 3; i++) art.line(cx - w * .15 + i * w * .1, cy - 9, cx - w * .2 + i * w * .1, cy - 14, '#fff0ce', 2)
  } else if (id === 'board' || id === 'free') {
    art.round(cx - w / 2, cy - 18, w, 22, 4, art.gradient(0, cy - 18, 0, 22, ['#dfbd86', '#bc8e55']), '#805c38', 2)
    for (let i = 0; i < 3; i++) art.line(cx - w * .4, cy - 12 + i * 6, cx + w * .42, cy - 14 + i * 6, '#a57c4945', 1)
  } else {
    plainFoot(id, cx, cy, area, yBase)
    art.line(cx - Math.min(8, w * .2), cy - 5, cx + Math.min(8, w * .2), cy - 5, '#ffffff80', 2)
  }
  ctx.restore()
}
const plainTank = drawMode2
drawMode2 = function() {
  plainTank(); const g = tankGeom()
  art.glass(g.left, g.top, g.tw, g.bot - g.top, false)
  ctx.save(); art.ellipse(g.left + g.tw / 2, g.waterTop + 2, g.tw / 2 - 4, 4, '#b7e6f440', '#72bdcf80', 1); ctx.restore()
}
const plainHydraulic = drawMode3
drawMode3 = function() {
  plainHydraulic()
  const travel = S.inDisp / CONFIG.STROKE * 100
  const outTravel = S.outDisp > .0003 ? travel / Math.sqrt(Math.max(1.2, S.a2 / S.a1)) : 0
  ctx.save()
  const x = 620, y = 160 - outTravel - 28
  art.round(x - 29, y - 16, 58, 23, 6, art.gradient(0, y - 16, 0, 23, ['#7eb3ee', '#3979be']), art.ink, 1.5)
  art.round(x - 15, y - 26, 29, 14, 5, '#78b4d1', art.ink, 1.5)
  art.round(x - 11, y - 23, 20, 9, 3, '#dcf4ff')
  art.bead(x - 16, y + 8, 7, '#35495e'); art.bead(x + 16, y + 8, 7, '#35495e')
  art.ellipse(x - 16, y + 8, 2, 2, '#d4e0e9'); art.ellipse(x + 16, y + 8, 2, 2, '#d4e0e9')
  art.line(151, 160 + travel - 43, 151, 160 + travel - 7, '#ffffff60', 3)
  ctx.restore()
}
const plainStraw = drawMode4
drawMode4 = function() {
  plainStraw(); art.glass(140, 220, 120, 180, false)
  ctx.save(); art.line(214, 140, 214, 387, '#ffffff70', 2); art.line(624, 88, 624, 410, '#ffffff90', 2); ctx.restore()
}
