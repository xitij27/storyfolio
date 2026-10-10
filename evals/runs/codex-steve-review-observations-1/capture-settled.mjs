import { chromium } from './runtime/node_modules/playwright/index.mjs'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

// Follow-up to the first captures: allow the source's 200 ms text transition
// to finish. Preserve the earlier images and their measurements unchanged.
const base = fileURLToPath(new URL('.', import.meta.url))
const browser = await chromium.launch({ headless: true })
const report = { capturedAtUtc: new Date().toISOString(), browser: browser.version(), settlingDelayMs: 400, captures: [] }
try {
  for (const width of [1440, 390, 320, 768, 800]) {
    const ctx = await browser.newContext({ viewport: { width, height: 1024 }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.intelligence-figure').scrollIntoViewIfNeeded()
    await page.locator('.scan-toggle').click()
    await page.locator('.pipeline-steps button').nth(2).click()
    await new Promise(resolve => setTimeout(resolve, 400))
    const details = await page.locator('.pipeline-detail').evaluateAll(elements => elements.map(el => ({ id: el.id, opacity: getComputedStyle(el).opacity, visibility: getComputedStyle(el).visibility })))
    const file = `captures/figure-${width}-settled.png`
    await page.locator('.intelligence-figure').screenshot({ path: `${base}${file}` })
    const bytes = await readFile(`${base}${file}`)
    report.captures.push({ file, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, width, details })
    await ctx.close()
  }
} finally {
  await browser.close()
  await writeFile(`${base}settled-measurements.json`, `${JSON.stringify(report, null, 2)}\n`)
}
console.log(`Saved ${report.captures.length} settled figures after ${report.settlingDelayMs} ms`)
