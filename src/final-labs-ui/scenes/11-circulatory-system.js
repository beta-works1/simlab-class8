const plainHeart = drawHeart
drawHeart = function(cx, cy, scale, phase) {
  plainHeart(cx, cy, scale, phase)
  ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale)
  ctx.translate(0, phase >= .16 && phase < .45 ? 3 : 0)
  heartOutline(); ctx.clip()
  ctx.fillStyle = art.gradient(-110, -100, 220, 240, ['#ffffff35', '#ffffff00', '#65394724']); ctx.fill()
  ctx.strokeStyle = '#ffffff60'; ctx.lineWidth = 4; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(-90, -55); ctx.quadraticCurveTo(-89, -91, -48, -87); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(28, -87); ctx.quadraticCurveTo(80, -98, 94, -60); ctx.stroke()
  ctx.restore()
}
const plainLungs = drawLungs
drawLungs = function(faint) {
  plainLungs(faint)
  ctx.save(); ctx.globalAlpha = faint ? .18 : .65
  for (const side of [-1, 1]) {
    const x = 150 + side * 54
    ctx.save(); lungLobe(x, 190, side); ctx.clip()
    ctx.fillStyle = art.gradient(x - 50, 95, 80, 180, ['#ffffff50', '#ffffff00', '#824e6930']); ctx.fill()
    art.line(x, 142, x + side * 18, 252, '#f1d8d2', 4)
    for (let i = 0; i < 5; i++) {
      const y = 155 + i * 18
      art.line(x + side * i * 3, y, x + side * (25 + i * 4), y + 15, '#f4d9d3', 2)
      art.line(x + side * i * 3, y, x - side * 8, y + 18, '#f4d9d3', 2)
    }
    ctx.restore()
  }
  ctx.restore()
}
const plainMicro = drawMicro
drawMicro = function() {
  plainMicro(); ctx.save()
  for (const cell of S.cells) {
    if (cell.kind === 'rbc') {
      art.ellipse(cell.x, cell.y, 12, 7.5, art.gradient(cell.x, cell.y - 8, 0, 16, ['#f99e97', css('--ox'), '#a93b54']), '#ac485f', .7)
      art.ellipse(cell.x, cell.y, 6, 3.2, '#fbc9b766', '#972f4925', .8)
      art.ellipse(cell.x - 5, cell.y - 3, 2, 1, '#ffffff85')
    } else if (cell.kind === 'wbc') {
      art.bead(cell.x, cell.y, 15, '#e2d8eb')
      art.ellipse(cell.x - 4, cell.y, 5, 7, '#8f729f'); art.ellipse(cell.x + 3, cell.y + 3, 4, 5, '#a18ab0')
      for (let i = 0; i < 4; i++) art.ellipse(cell.x + Math.cos(i * 1.8) * 10, cell.y + Math.sin(i * 1.8) * 9, 1, 1, '#907ba8')
    }
  }
  ctx.restore()
}
