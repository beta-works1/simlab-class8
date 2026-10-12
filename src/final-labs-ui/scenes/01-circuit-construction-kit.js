const plainCell = drawCell, plainBulb = drawBulb, plainSwitch = drawSwitch
const plainResistor = drawResistor, plainFuse = drawFuse, plainMeter = drawMeter
drawCell = function(p, lead, sym) {
  if (sym) return plainCell(p, lead, sym)
  ctx.save()
  const w = PX * .68, h = PX * .4, positive = p.flip ? 1 : -1
  art.shadow(0, h * .74, w * .58, h * .24)
  art.round(-w / 2, -h / 2, w, h, h * .24, art.gradient(0, -h / 2, 0, h, ['#6ca8e4', '#2468b7', '#194d8d']), art.ink, 1.4)
  art.round(positive < 0 ? -w / 2 : w * .23, -h / 2, w * .27, h, h * .15, art.gradient(0, -h / 2, 0, h, ['#ffe28b', '#d69a3e']), art.ink, 1)
  art.round(positive < 0 ? -w / 2 - 3 : w / 2 - 1, -h * .22, 4, h * .44, 1, '#b4c3ce', art.ink, 1)
  art.line(-w * .13, -h * .23, w * .31, -h * .23, '#ffffff70', 1.8)
  ctx.fillStyle = '#fff'; ctx.font = `700 ${Math.max(8, PX * .15)}px ${css('--font')}`; ctx.textAlign = 'center'
  ctx.fillText('+', positive * w * .34, h * .22)
  ctx.fillStyle = css('--text-2'); ctx.font = `700 ${Math.max(11, PX * .18)}px ${css('--font')}`
  ctx.fillText(p.value.toFixed(1) + ' V', 0, -PX * .3)
  ctx.restore()
}
drawBulb = function(p, I, lead, sym) {
  if (sym) return plainBulb(p, I, lead, sym)
  const r = PX * .3, brightness = Math.min(1, I * I * p.value / 4)
  ctx.save()
  if (brightness > .02) {
    const glow = ctx.createRadialGradient(0, -r * .12, r * .35, 0, 0, r * 2.6)
    glow.addColorStop(0, `rgba(255,191,63,${brightness * .75})`); glow.addColorStop(1, 'rgba(255,191,63,0)')
    art.ellipse(0, 0, r * 2.6, r * 2.6, glow)
  }
  art.line(-lead, 0, -r * .45, r * .8, css('--wire'), 2.5)
  art.line(lead, 0, r * .45, r * .8, css('--wire'), 2.5)
  art.ellipse(0, -r * .2, r, r, art.gradient(-r, -r, r * 2, r * 2, brightness > .02 ? ['#fffde6', '#ffe081', '#edaf46'] : ['#f4fdff', '#d1e6ee', '#a2c1cf']), '#7295a8', 1.5)
  art.round(-r * .5, r * .53, r, r * .65, 2, art.gradient(-r / 2, 0, r, 0, ['#8092a0', '#e5edf1', '#728594']), art.ink, 1)
  for (let i = 0; i < 3; i++) art.line(-r * .45, r * (.68 + i * .17), r * .45, r * (.62 + i * .17), '#526c80', 1)
  art.line(-r * .25, r * .55, -r * .29, -r * .1, '#9a7338', 1)
  art.line(r * .25, r * .55, r * .29, -r * .1, '#9a7338', 1)
  ctx.beginPath(); ctx.moveTo(-r * .3, -r * .1); ctx.lineTo(-r * .1, r * .07); ctx.lineTo(r * .1, -r * .08); ctx.lineTo(r * .3, -r * .1)
  ctx.strokeStyle = brightness > .02 ? '#fff8c8' : '#7e674a'; ctx.lineWidth = 1.8; ctx.stroke()
  art.ellipse(-r * .36, -r * .58, r * .18, r * .31, '#ffffffb0')
  ctx.restore()
}
drawSwitch = function(p, lead, sym) {
  if (sym) return plainSwitch(p, lead, sym)
  ctx.save()
  art.round(-lead - 3, -PX * .08, lead * 2 + 6, PX * .25, 4, art.gradient(0, 0, 0, PX * .2, ['#c9dfdf', '#76969b']), art.ink, 1.5)
  art.bead(-lead, 0, 3.5, '#c6a259'); art.bead(lead, 0, 3.5, '#c6a259')
  const angle = art.follow(p, p.closed ? 0 : -.48)
  const x = -lead + Math.cos(angle) * lead * 2, y = Math.sin(angle) * lead * 2
  art.line(-lead, 0, x, y, '#29485b', 5); art.line(-lead, -1, x, y - 1, '#dce9ea', 2)
  art.bead(x, y, 4, '#ed765d'); ctx.restore()
}
drawResistor = function(p, lead, sym) {
  if (sym) return plainResistor(p, lead, sym)
  ctx.save()
  const w = PX * .54, h = PX * .25
  art.round(-w / 2, -h / 2, w, h, h * .4, art.gradient(0, -h / 2, 0, h, ['#fff0c7', '#dfc089', '#b6955d']), art.ink, 1.2)
  const bands = ['#292b2c', '#824d35', '#c74d49', '#e79043', '#e6cc57', '#548965', '#4c74a2', '#90739f', '#8b9394', '#f1e8d9']
  const exponent = Math.floor(Math.log10(Math.max(.01, p.value))) - 1
  const digits = Math.round(p.value / 10 ** exponent)
  const colors = [bands[Math.floor(digits / 10)], bands[digits % 10], exponent === -2 ? '#aeb7bd' : exponent === -1 ? '#c2a65d' : bands[exponent]]
  for (let i = 0; i < 3; i++) art.round(-w * .3 + i * w * .23, -h * .46, w * .065, h * .92, 1, colors[i])
  ctx.fillStyle = css('--text-2'); ctx.textAlign = 'center'; ctx.font = `700 ${Math.max(11, PX * .18)}px ${css('--font')}`
  ctx.fillText(p.value + ' Ω', 0, -PX * .27); ctx.restore()
}
drawFuse = function(p, lead, sym) {
  if (sym) return plainFuse(p, lead, sym)
  plainFuse(p, lead, sym)
  ctx.save(); const w = PX * .56, h = PX * .22
  art.round(-w / 2, -h / 2, w * .2, h, 2, '#96b0c0', art.ink, 1)
  art.round(w * .3, -h / 2, w * .2, h, 2, '#96b0c0', art.ink, 1)
  art.line(-w * .23, -h * .27, w * .2, -h * .27, '#ffffffc0', 1.5); ctx.restore()
}
drawMeter = function(letter, text, lead) {
  if (S.view === 'sym') return plainMeter(letter, text, lead)
  ctx.save(); const w = PX * .57, h = PX * .49
  art.round(-w / 2, -h / 2, w, h, 4, art.gradient(0, -h / 2, 0, h, ['#ffce78', '#dc9940']), art.ink, 1.4)
  art.round(-w * .37, -h * .35, w * .74, h * .36, 2, '#d7e9d6', '#758d80', .7)
  ctx.fillStyle = '#2e504e'; ctx.textAlign = 'center'; ctx.font = `700 ${PX * .14}px ${css('--font')}`; ctx.fillText(letter, 0, -h * .08)
  art.bead(0, h * .25, 3.5, '#36516b')
  ctx.fillStyle = css('--text-2'); ctx.font = `700 ${Math.max(11, PX * .18)}px ${css('--font')}`; ctx.fillText(text, 0, -PX * .34)
  ctx.restore()
}
const plainTrayIcon = trayIcon
trayIcon = function(type, material) {
  const shapes = {
    cell: '<rect x="7" y="7" width="31" height="19" rx="5" fill="#377bbd" stroke="#294c6d" stroke-width="1.5"/><path d="M12 7h6v19h-6a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5" fill="#eec46c"/><rect x="4" y="12" width="4" height="9" rx="1.5" fill="#a8b9c5"/><path d="M21 11h12" stroke="#b1d7f1" stroke-width="2" stroke-linecap="round"/><path d="M10 16h5m-2.5-2.5v5" stroke="#754b30"/>',
    bulb: '<path d="M15 22c-2-3-5-5-5-10a11 11 0 0 1 22 0c0 5-3 7-5 10" fill="#ffe3a1" stroke="#c69c57" stroke-width="1.5"/><path d="M17 22v-8l4 3 4-3v8" fill="none" stroke="#c69551"/><rect x="15" y="22" width="12" height="8" rx="2" fill="#a2b4c0" stroke="#57788e"/><path d="M16 25h10m-10 3h10" stroke="#57788e"/><ellipse cx="15" cy="9" rx="2" ry="4" fill="#fff9df"/>',
    switch: '<rect x="3" y="19" width="38" height="10" rx="4" fill="#9ebfc4" stroke="#4e7884"/><circle cx="9" cy="20" r="3" fill="#d4b775"/><circle cx="35" cy="20" r="3" fill="#d4b775"/><path d="M9 20L32 6" stroke="#456c83" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="6" r="4" fill="#ee795f"/>',
    ammeter: '<rect x="9" y="3" width="26" height="28" rx="5" fill="#eaba61" stroke="#986e39"/><rect x="13" y="7" width="18" height="10" rx="2" fill="#d8e9d8"/><text x="22" y="15" text-anchor="middle" font-size="9" font-weight="700" fill="#355c50">A</text><circle cx="22" cy="24" r="4" fill="#46677b"/>',
    voltmeter: '<rect x="9" y="3" width="26" height="28" rx="5" fill="#eaba61" stroke="#986e39"/><rect x="13" y="7" width="18" height="10" rx="2" fill="#d8e9d8"/><text x="22" y="15" text-anchor="middle" font-size="9" font-weight="700" fill="#355c50">V</text><circle cx="22" cy="24" r="4" fill="#46677b"/>',
    resistor: '<path d="M2 17h40" stroke="#78919f" stroke-width="3"/><rect x="9" y="10" width="26" height="14" rx="6" fill="#e2c695" stroke="#a98b60"/><path d="M15 11v12m6-12v12m6-12v12" stroke="#9c7351" stroke-width="2"/><path d="M13 12h17" stroke="#fff0c5" stroke-width="1.5"/>',
    fuse: '<path d="M2 17h40" stroke="#758f9d" stroke-width="2"/><rect x="8" y="10" width="28" height="14" rx="3" fill="#dff3f5" stroke="#8eb3c1"/><path d="M13 17h18" stroke="#bc9570"/><path d="M8 10h6v14H8zm22 0h6v14h-6z" fill="#99aeba"/><path d="M16 12h12" stroke="white" stroke-width="2"/>',
    wire: '<path d="M4 20c8-24 26 16 36-8" fill="none" stroke="#526c7a" stroke-width="6" stroke-linecap="round"/><path d="M4 18c8-24 26 16 36-8" fill="none" stroke="#abc4d0" stroke-width="2" stroke-linecap="round"/>',
  }
  return shapes[type] ? `<svg width="44" height="32" viewBox="0 0 44 34" aria-hidden="true">${shapes[type]}</svg>` : plainTrayIcon(type, material)
}
for (const button of document.querySelectorAll('#tray .part')) {
  const icon = button.querySelector('svg')
  if (icon) icon.outerHTML = trayIcon(button.dataset.type, button.dataset.material)
}
