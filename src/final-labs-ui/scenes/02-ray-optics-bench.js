drawLamp = function(p, on) {
  ctx.save()
  art.shadow(p.x, p.y + 27, 21, 4)
  art.round(p.x - 20, p.y + 18, 40, 9, 4, '#8199af', art.ink, 1.5)
  art.line(p.x, p.y + 8, p.x, p.y + 18, '#627d96', 6)
  art.round(p.x - 19, p.y - 15, 38, 30, 9, art.gradient(p.x, p.y - 15, 0, 30, ['#83b5e6', '#3974bb', '#24508a']), art.ink, 2)
  art.bead(p.x, p.y, 10, on ? '#ffdc77' : '#9dabb8')
  if (on) {
    const glow = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, 28)
    glow.addColorStop(0, '#ffe49b65'); glow.addColorStop(1, '#ffe49b00')
    art.ellipse(p.x, p.y, 28, 28, glow)
  }
  art.line(p.x - 13, p.y - 10, p.x + 6, p.y - 10, '#ffffff90', 2)
  ctx.restore()
}
const plainMirror = drawMirror
drawMirror = function(m, hi) {
  const g = mirrorGeom(m)
  ctx.save()
  art.line(g.p1.x + 2, g.p1.y + 4, g.p2.x + 2, g.p2.y + 4, '#30445b35', 10)
  art.line(g.p1.x, g.p1.y, g.p2.x, g.p2.y, '#84b0c7', 9)
  ctx.restore()
  plainMirror(m, hi)
  ctx.save(); art.line(g.p1.x - 1, g.p1.y - 1, g.p2.x - 1, g.p2.y - 1, '#e5faff', 2); ctx.restore()
}
drawCandle = function(x, yBase, h, ghost, inv, mag) {
  const height = Math.max(2, h * (mag == null ? 1 : Math.abs(mag)))
  ctx.save(); ctx.globalAlpha = ghost ? .4 : 1
  ctx.translate(x, yBase); if (inv) ctx.scale(1, -1)
  const w = Math.min(15, Math.max(7, height * .25)), flameH = Math.min(25, height * .35)
  art.round(-w / 2, -height + flameH, w, height - flameH, 3, ghost ? css('--ghost') : art.gradient(-w / 2, 0, w, 0, ['#f5ad83', '#ffdfb0', '#e89978']), ghost ? null : '#b87960', 1)
  art.line(0, -height + flameH, 0, -height + flameH - 5, '#5e493d', 1.5)
  if (!ghost) art.flame(0, -height + flameH, w * .45, flameH, S.pulse || 0)
  else art.ellipse(0, -height + flameH * .5, w * .3, flameH * .5, css('--ghost'))
  ctx.restore()
}
