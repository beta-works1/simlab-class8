flame = function(x, y, size) { art.flame(x, y + 8, 17 * size, 46 * size, S.tSim) }
const plainConduction = drawMode1
drawMode1 = function() {
  plainConduction()
  ctx.save()
  for (let i = 0; i < S.rods.length; i++) {
    const y = 90 + i * 140, h = (CONFIG.ROD_ROWS - 1) * 16 + 18
    const material = S.rods[i].mat
    const colors = material === 'wood' ? ['#ad814f', '#dfbd86', '#8c673f'] : material === 'copper' ? ['#b46e49', '#edc09b', '#a96643'] : ['#718b9c', '#d2dfe4', '#6f899a']
    art.round(118, y - 12, W - 190, h, 8, null, '#7e9bb080', 2)
    art.round(119, y + h - 13, W - 192, 5, 2, art.gradient(119, 0, W - 192, 0, colors))
    art.line(129, y - 9, W - 84, y - 9, '#ffffffb0', 2)
  }
  ctx.restore()
}
const plainConvection = drawMode2
drawMode2 = function() {
  plainConvection(); const b = beaker(); art.glass(b.x, b.y, b.w, b.h)
}
const plainRadiation = drawMode3
drawMode3 = function() {
  plainRadiation()
  const x = 90 + lerp(140, 520, S.radDist), y = H / 2
  ctx.save()
  art.line(x - 14, y - 42, x - 14, y + 35, '#ffffffb0', 2)
  for (let i = 0; i < 6; i++) art.line(x + 7, y - 36 + i * 13, x + 14, y - 36 + i * 13, '#68869b', 1)
  art.round(x - 24, y + 47, 48, 6, 3, '#8ea3b0')
  ctx.restore()
}
const plainPot = drawMode4
drawMode4 = function() {
  plainPot(); ctx.save()
  art.round(319, 206, 13, 160, 5, art.gradient(319, 0, 13, 0, ['#5d7a8d', '#d3e4ed', '#8298a7']))
  art.round(568, 206, 13, 160, 5, art.gradient(568, 0, 13, 0, ['#819aaa', '#dfedf2', '#6c8799']))
  art.round(326, 362, 249, 10, 4, art.gradient(0, 362, 0, 10, ['#d7e7ec', '#6c8798']))
  art.round(288, 246, 33, 17, 7, null, '#58758b', 7)
  art.round(580, 246, 33, 17, 7, null, '#58758b', 7)
  art.line(342, 253, 342, 342, '#ffffff65', 4)
  ctx.restore()
}
