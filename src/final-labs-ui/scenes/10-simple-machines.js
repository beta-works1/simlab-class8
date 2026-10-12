drawCrate = function(x, y, n) {
  ctx.save()
  art.round(x - 28, y - 36, 56, 44, 5, art.gradient(x, y - 36, 0, 44, ['#d9ae71', '#b0804c']), '#755737', 2)
  art.line(x - 23, y - 30, x + 23, y + 2, '#edce97', 5)
  art.line(x + 23, y - 30, x - 23, y + 2, '#c8975e', 5)
  art.round(x - 29, y - 38, 58, 6, 2, '#e4bf87', '#876440', 1)
  for (const dx of [-22, 22]) for (const dy of [-30, 1]) art.ellipse(x + dx, y + dy, 1.6, 1.6, '#6a5949')
  art.round(x - 24, y - 26, 48, 20, 3, '#fff5db')
  label(fmtN(n) + ' N', x, y - 16, { size: 12, fill: '#5a4533', bold: true })
  ctx.restore()
}
drawFulcrum = function(x, y) {
  ctx.save(); art.shadow(x, y + 37, 29, 5)
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 22, y + 36); ctx.lineTo(x + 22, y + 36); ctx.closePath()
  ctx.fillStyle = art.gradient(x - 22, 0, 44, 0, ['#71a681', '#a5c89b', css('--fulc')]); ctx.fill()
  ctx.strokeStyle = '#436d51'; ctx.lineWidth = 2; ctx.stroke()
  art.line(x + 2, y + 9, x + 15, y + 30, '#ffffff80', 2)
  art.bead(x, y + 22, 3.5, '#638771'); ctx.restore()
}
pulleyWheel = function(x, y, r) {
  ctx.save()
  art.ellipse(x + 2, y + 3, r, r, '#344f6830')
  art.ellipse(x, y, r, r, art.gradient(x - r, y - r, r * 2, r * 2, ['#dce8ef', '#8fadc2', '#587b95']), '#395c75', 2)
  art.ellipse(x, y, r * .76, r * .76, '#e1edf1', '#7193a9', 2)
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + (artReduced.matches ? 0 : S.rope * 1.6 / r)
    art.line(x + Math.cos(a) * r * .25, y + Math.sin(a) * r * .25, x + Math.cos(a) * r * .66, y + Math.sin(a) * r * .66, '#8aabba', 3)
  }
  art.bead(x, y, r * .28, '#e2b46c'); ctx.restore()
}
