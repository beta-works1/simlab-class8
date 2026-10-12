const plainBeaker = drawGlassBeaker
drawGlassBeaker = function(x, y, w, h, fillRGB, appear, papers, selected, caption, sub) {
  ctx.save(); art.shadow(x + w / 2, y + h - 23, w * .37, 5); ctx.restore()
  plainBeaker(x, y, w, h, fillRGB, appear, papers, selected, caption, sub)
  const left = x + 10, right = x + w - 10, top = y + 8, bot = y + h - 28
  ctx.save()
  art.line(left + 8, top + 46, left + 11, bot - 17, '#ffffff95', 3)
  art.line(right - 7, top + 28, right - 10, bot - 15, '#7cb0c245', 2)
  ctx.beginPath(); ctx.ellipse(x + w / 2, top + 8, (right - left) / 2 + 2, 7, 0, Math.PI, Math.PI * 2)
  ctx.strokeStyle = '#d8f2fa'; ctx.lineWidth = 3; ctx.stroke()
  for (let i = 1; i < 4; i++) art.line(right - 20, top + 28 + i * (bot - top - 42) / 4, right - 10, top + 28 + i * (bot - top - 42) / 4, '#487d9075', 1)
  const liquidTop = top + (h - 28) * .38
  art.ellipse(x + w / 2, liquidTop + 3, (right - left) / 2 - 5, 4, '#ffffff20', '#ffffff55', 1)
  ctx.restore()
}
