// Recovery-only correction: a chooser belongs to its declared source route,
// not necessarily to the destination route used for the entry screenshot.
import assert from "node:assert/strict";

export async function activateChoice({ page, go, control, observe }) {
  const result = { fromRoute: control.fromRoute };
  await go(control.fromRoute);
  async function click(declared) {
    const node = page.locator(declared.selector);
    assert.equal(await node.count(), 1, "Observed activation control is not unique");
    assert.equal(await node.evaluate(element => element.getAttribute("aria-label") || element.textContent?.trim()), declared.name, "Observed activation control name changed");
    await node.click(); await page.waitForTimeout(1800);
    return page.evaluate(observe);
  }
  if (control.prepareControl) result.preparation = { ...control.prepareControl, observation: await click(control.prepareControl) };
  result.observation = await click(control);
  return result;
}
