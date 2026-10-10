import { chromium } from './runtime/node_modules/playwright/index.mjs'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const base = fileURLToPath(new URL('.', import.meta.url))
const output = `${base}captures`
await mkdir(output, { recursive: true })
const url = process.env.REVIEW_URL || 'http://127.0.0.1:4173/'
const browser = await chromium.launch({ headless: true })
const report = { capturedAtUtc: new Date().toISOString(), url, browser: browser.version(), viewports: [], interactions: {}, captures: [] }
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const errors = []

async function context(options) {
  const ctx = await browser.newContext({ deviceScaleFactor: 1, ...options })
  const page = await ctx.newPage()
  page.on('pageerror', error => errors.push({ context: options, type: 'pageerror', message: error.message }))
  page.on('requestfailed', request => errors.push({ context: options, type: 'requestfailed', url: request.url(), failure: request.failure() }))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  return { ctx, page }
}

async function capture(page, name, locator) {
  const file = `${name}.png`
  if (locator) await locator.screenshot({ path: `${output}/${file}` })
  else await page.screenshot({ path: `${output}/${file}` })
  const bytes = await readFile(`${output}/${file}`)
  report.captures.push({ file: `captures/${file}`, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length })
}

async function snapshot(page) {
  return page.evaluate(() => {
    const box = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom } }
    const visible = el => !!el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && !!el.getClientRects().length
    const names = [...document.querySelectorAll('.pipeline-steps span')].map(el => ({ text: el.textContent, rect: box(el), position: getComputedStyle(el).position, clipPath: getComputedStyle(el).clipPath, overflow: getComputedStyle(el).overflow }))
    const controls = [...document.querySelectorAll('.pipeline-steps button')].map(el => ({ name: el.textContent, disabled: el.disabled, current: el.getAttribute('aria-current'), rect: box(el) }))
    const nav = [...document.querySelectorAll('.primary-nav > a')].map(el => ({ text: el.textContent, rect: box(el), visible: visible(el) }))
    const pause = document.querySelector('.scan-toggle')
    return {
      viewport: { width: innerWidth, height: innerHeight }, document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      header: box(document.querySelector('.site-header')), wordmark: box(document.querySelector('.wordmark')), nav,
      menu: { visible: visible(document.querySelector('.menu-toggle')), expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded') },
      pipeline: { names, controls, pause: { visible: visible(pause), hidden: pause.hidden, rect: box(pause), label: pause.getAttribute('aria-label') },
        active: document.querySelector('.pipeline-detail.is-active')?.id, activeText: document.querySelector('.pipeline-detail.is-active')?.innerText,
        classes: document.querySelector('.intelligence-figure').className, clock: document.querySelector('.scan-timecode')?.textContent,
        toolTransform: document.querySelector('.scan-tool')?.getAttribute('transform') },
      fonts: { status: document.fonts.status, manrope: document.fonts.check('17px Manrope'), dmSans: document.fonts.check('14px "DM Sans"') },
      focus: { tag: document.activeElement.tagName, id: document.activeElement.id, className: document.activeElement.className, text: document.activeElement.textContent?.trim().slice(0, 160) }
    }
  })
}

try {
  for (const [width, height] of [[1440, 1000], [390, 844], [320, 740], [768, 1024], [800, 1024]]) {
    const { ctx, page } = await context({ viewport: { width, height } })
    const firstScreen = await snapshot(page)
    await capture(page, `viewport-${width}`)
    await page.locator('.intelligence-figure').scrollIntoViewIfNeeded()
    await page.locator('.scan-toggle').click()
    await page.locator('.pipeline-steps button').nth(2).click()
    await capture(page, `figure-${width}`, page.locator('.intelligence-figure'))
    report.viewports.push({ firstScreen, figurePaused: await snapshot(page) })
    await ctx.close()
  }

  {
    const { ctx, page } = await context({ viewport: { width: 390, height: 844 } })
    const keyboard = []
    await page.keyboard.press('Tab')
    keyboard.push({ action: 'Tab from initial page', state: await snapshot(page) })
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    keyboard.push({ action: 'Tab twice more to menu', state: await snapshot(page) })
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')
    keyboard.push({ action: 'Enter opens menu, Tab to first link', state: await snapshot(page) })
    await capture(page, 'mobile-menu-keyboard')
    await page.keyboard.press('Escape')
    keyboard.push({ action: 'Escape from first nav link', state: await snapshot(page) })
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    keyboard.push({ action: 'Reopen and activate first nav link', hash: new URL(page.url()).hash, state: await snapshot(page) })
    report.interactions.keyboardMenu = keyboard
    await ctx.close()
  }

  {
    const { ctx, page } = await context({ viewport: { width: 1440, height: 1000 } })
    const records = []
    const steps = page.locator('.pipeline-steps button')
    for (const i of [0, 5]) {
      await steps.nth(i).click()
      const started = Date.now()
      const initial = await snapshot(page)
      await page.waitForFunction(id => document.querySelector('.pipeline-detail.is-active')?.id !== id, initial.pipeline.active, { timeout: 15000, polling: 50 })
      records.push({ action: `Select stage ${i + 1} while playing`, changedAfterMs: Date.now() - started, initial, afterChange: await snapshot(page) })
    }
    await page.locator('.scan-toggle').click()
    await steps.nth(1).click()
    const initial = await snapshot(page)
    await wait(7000)
    records.push({ action: 'Pause, select stage 2, wait 7000 ms', initial, afterWait: await snapshot(page) })
    await page.locator('.scan-toggle').click()
    const resumed = await snapshot(page)
    await wait(1200)
    records.push({ action: 'Resume and wait 1200 ms', initial: resumed, afterWait: await snapshot(page) })
    report.interactions.playPauseAndStages = records
    await ctx.close()
  }

  {
    const { ctx, page } = await context({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    await page.locator('.intelligence-figure').scrollIntoViewIfNeeded()
    const initial = await snapshot(page)
    await wait(1600)
    const afterWait = await snapshot(page)
    await page.locator('.pipeline-steps button').nth(5).click()
    const selected = await snapshot(page)
    await wait(1600)
    report.interactions.reducedMotion = { initial, afterWait, selected, afterSelectedWait: await snapshot(page) }
    await capture(page, 'reduced-motion-stage-6', page.locator('.intelligence-figure'))
    await ctx.close()
  }

  {
    const { ctx, page } = await context({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false })
    const initial = await snapshot(page)
    await capture(page, 'javascript-off-mobile')
    await page.locator('.intelligence-figure').scrollIntoViewIfNeeded()
    await capture(page, 'javascript-off-figure', page.locator('.intelligence-figure'))
    await page.locator('.primary-nav a[href="#work"]').click()
    report.interactions.javaScriptOff = { initial, afterAnchorClick: await snapshot(page), hash: new URL(page.url()).hash }
    await ctx.close()
  }
} catch (error) {
  report.failure = { message: error.message, stack: error.stack }
  process.exitCode = 1
} finally {
  report.errors = errors
  report.completedAtUtc = new Date().toISOString()
  await writeFile(`${base}runtime-measurements.json`, `${JSON.stringify(report, null, 2)}\n`)
  await browser.close()
  console.log(JSON.stringify({ captures: report.captures.length, viewportChecks: report.viewports.length, interactionGroups: Object.keys(report.interactions), errors: report.errors.length, failure: report.failure?.message || null }, null, 2))
}
