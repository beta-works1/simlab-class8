import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { Script } from 'node:vm'
import ts from 'typescript'

const baseline = JSON.parse(await fs.readFile(new URL('../src/final-labs-ui/core-baseline.json', import.meta.url), 'utf8'))
for (const [name, expected] of Object.entries(baseline.files)) {
  const html = await fs.readFile(new URL(`../public/final-sims/${name}`, import.meta.url), 'utf8')
  const originalScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]).join('\n')
  assert.equal(createHash('sha256').update(originalScripts).digest('hex'), expected, `${name}: original simulation script changed`)
  assert.equal((html.match(/<style id="final-labs-ui">/g) || []).length, 1, `${name}: UI styles missing or duplicated`)
  assert.equal((html.match(/<script data-final-labs-ui>/g) || []).length, 1, `${name}: UI script missing or duplicated`)
  const scenes = [...html.matchAll(/<script data-final-labs-scene>([\s\S]*?)<\/script>/g)]
  assert.equal(scenes.length, 1, `${name}: illustration script missing or duplicated`)
  const illustration = scenes[0][1]
  new Script(illustration, { filename: name })
  assert.ok(!/\b(requestAnimationFrame|setInterval|setTimeout)\s*\(/.test(illustration), `${name}: illustrations must use the existing draw loop`)
  const parsed = ts.createSourceFile(name, illustration, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  function rootIdentifier(node) {
    while (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) node = node.expression
    return ts.isIdentifier(node) ? node.text : ''
  }
  function checkWrites(node) {
    const assignment = ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
    const unaryWrite = (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken].includes(node.operator)
    const target = assignment ? node.left : unaryWrite ? node.operand : ts.isDeleteExpression(node) ? node.expression : null
    if (target) assert.ok(!['S', 'CONFIG'].includes(rootIdentifier(target)), `${name}: renderer writes simulation state`)
    ts.forEachChild(node, checkWrites)
  }
  checkWrites(parsed)
  assert.ok(!/<script[^>]+src\s*=/.test(html), `${name}: external script breaks standalone download`)
  assert.ok(Buffer.byteLength(html) < 2 * 1024 * 1024, `${name}: over the offline file budget`)
}
console.log(`Verified ${Object.keys(baseline.files).length} labs: original scripts unchanged, one UI and illustration layer, no scene writes to S/CONFIG or extra timers, standalone scripts, below 2 MB.`)
