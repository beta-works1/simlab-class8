const plainLeaf = drawLeaf
drawLeaf = function() {
  plainLeaf()
  ctx.save()
  ctx.strokeStyle = '#67914c65'; ctx.lineWidth = 1.5
  for (let i = 0; i < 12; i++) {
    const x = 185 + i * 46
    art.round(x, 121, 39, 77, 13, null, '#649b5965', 1.5)
  }
  for (const c of CHLORO) {
    ctx.globalAlpha = .45 + .55 * S.light
    art.bead(c.x, c.y, 8, css('--chloro'))
    art.line(c.x - 3, c.y - 2, c.x + 3, c.y - 2, '#c5e5a1a0', 1)
    art.line(c.x - 3, c.y + 2, c.x + 3, c.y + 2, '#c5e5a1a0', 1)
  }
  ctx.globalAlpha = 1
  for (const s of STOMA) {
    const offset = S.stoma ? 17 : 7
    art.ellipse(s.x - offset, s.y, 5, 10, art.gradient(s.x - offset, s.y - 10, 0, 20, ['#8bb570', '#487e4d']), '#427345', 1)
    art.ellipse(s.x + offset, s.y, 5, 10, art.gradient(s.x + offset, s.y - 10, 0, 20, ['#8bb570', '#487e4d']), '#427345', 1)
  }
  ctx.restore()
}
function illustratedLeaf(x, y, length, angle) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(angle)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(length * .25, -length * .34, length * .75, -length * .3, length, 0)
  ctx.bezierCurveTo(length * .68, length * .32, length * .18, length * .25, 0, 0)
  ctx.fillStyle = art.gradient(0, -length * .3, 0, length * .6, ['#9fcf78', '#549d60', '#347a52']); ctx.fill()
  ctx.strokeStyle = '#37744c'; ctx.lineWidth = 1.6; ctx.stroke()
  art.line(3, 0, length - 7, 0, '#c2dda090', 1.5)
  for (let i = 1; i < 4; i++) {
    const xx = length * i / 5
    art.line(xx, 0, xx + length * .14, -length * .14, '#c2dda070', 1)
    art.line(xx, 0, xx + length * .14, length * .12, '#c2dda070', 1)
  }
  ctx.restore()
}
drawLab = function() {
  ctx.save()
  ctx.fillStyle = css('--board'); ctx.fillRect(0, 0, W, H)
  art.round(220, 80, 460, 360, 18, art.gradient(220, 80, 0, 360, ['#e7f7fb', '#c1e7f0', '#a9d5e5']), '#8cb5c8', 2)
  art.ellipse(450, 100, 225, 7, '#ffffff35', '#b3dce8', 1)
  art.round(200, 431, 500, 17, 5, art.gradient(0, 431, 0, 17, ['#b1bfc7', '#708793']))
  art.shadow(450, 416, 87, 10)
  art.line(450, 411, 450, 181, '#407e52', 7)
  art.line(448, 405, 448, 187, '#a8cf7a', 2)
  for (let i = 0; i < 5; i++) {
    const y = 360 - i * 37, len = 73 - i * 8
    illustratedLeaf(450, y, len, -.55)
    illustratedLeaf(450, y + 12, len, Math.PI + .5)
  }
  illustratedLeaf(450, 210, 57, -Math.PI / 2)
  for (const b of S.bubbles) {
    art.ellipse(b.x, b.y, b.r, b.r, '#e8f9ff50', css('--o2'), 1.5)
    art.ellipse(b.x - b.r * .3, b.y - b.r * .3, Math.max(1, b.r * .2), Math.max(1, b.r * .2), '#ffffffc0')
  }
  art.glass(220, 80, 460, 360, false)
  label(T('m2'), 20, 24, { size: 14, align: 'left', bold: true, fill: css('--text-2') })
  label(Math.round(rates2().bpm) + ' ' + T('bpm'), W / 2, 54, { size: 18, bold: true, fill: css('--o2') })
  ctx.restore()
}
