drawDrum = function(x, y, disp) {
  ctx.save(); ctx.translate(x, y)
  art.shadow(0, 116, 51, 8)
  art.round(-7, 64, 14, 50, 5, '#6d8498', art.ink, 2)
  art.line(0, 107, -35, 117, '#627e96', 5); art.line(0, 107, 35, 117, '#627e96', 5)
  art.ellipse(disp * .35, 0, 52, 70, art.gradient(-52, 0, 104, 0, ['#ad6440', '#edab67', '#b96847']), art.ink, 3)
  for (let i = -2; i <= 2; i++) art.line(-30 + disp * .35, i * 23, 27 + disp * .35, i * 23 + 11, '#794d4160', 2)
  art.ellipse(disp, 0, 39, 55, art.gradient(disp - 39, -55, 78, 110, ['#fff6d6', '#ebd7ae', '#c5ac83']), '#f6dec0', 5)
  art.ellipse(disp + 3, 0, 31, 47, null, '#b4946a70', 1.5)
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4
    art.bead(disp + Math.cos(a) * 45, Math.sin(a) * 62, 3.5, '#dde4e7')
  }
  ctx.restore()
}
drawSpeaker = function(x, y, disp) {
  ctx.save(); ctx.translate(x, y)
  art.round(-43, -35, 30, 70, 9, art.gradient(-43, 0, 30, 0, ['#70849c', '#344d68']), art.ink, 2)
  ctx.beginPath(); ctx.moveTo(-15, -24); ctx.lineTo(18 + disp, -49); ctx.lineTo(18 + disp, 49); ctx.lineTo(-15, 24); ctx.closePath()
  ctx.fillStyle = art.gradient(-15, -49, 48, 98, ['#90aed1', '#446c9a', '#254b76']); ctx.fill(); ctx.strokeStyle = art.ink; ctx.lineWidth = 2; ctx.stroke()
  art.ellipse(18 + disp, 0, 12, 49, art.gradient(6 + disp, 0, 24, 0, ['#263f5c', '#698baa', '#304d70']), '#8faac4', 3)
  art.ellipse(20 + disp, 0, 6, 22, '#c0d6e4', '#466883', 2)
  art.line(-36, -24, -36, 24, '#c7ddec70', 3)
  ctx.restore()
}
