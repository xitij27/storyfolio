// Copy of stage-3-storyboard-length-1/measurement-2/hit-target.mjs with a 1-px in-view allowance; the original stays frozen.
// Browser-serializable inspection only. No scroll, focus, click or DOM mutation.
// Pointer callers must activate the returned viewport point, not the union center.
// Keyboard callers still establish sequential-Tab focus and use the native key.
export function inspectControlHit(node) {
  const doc = node.ownerDocument, view = doc.defaultView;
  const viewport = { width: view.innerWidth, height: view.innerHeight };
  const rectangle = rect => ({ x: rect.x, y: rect.y, width: rect.width, height: rect.height,
    left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
  const positive = rect => Object.values(rect).every(Number.isFinite) && rect.width > 0 && rect.height > 0;
  // Sub-pixel layout can overrun an edge by a fraction of a pixel (0.078 px in concept unit 2); allow 1 px. The click point must still be inside.
  const inViewport = rect => positive(rect) && rect.left >= -1 && rect.top >= -1 && rect.right <= viewport.width + 1 && rect.bottom <= viewport.height + 1;
  const identity = element => element ? {
    tagName: element.tagName.toLowerCase(), id: element.getAttribute("id"),
    className: element.getAttribute("class"), role: element.getAttribute("role"),
    ariaLabel: element.getAttribute("aria-label"), href: element.getAttribute("href"),
    text: (element.textContent ?? "").trim().slice(0, 160),
  } : null;
  const probe = (x, y) => {
    const inside = Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0 && x < viewport.width && y < viewport.height;
    const hit = inside ? doc.elementFromPoint(x, y) : null;
    return { x, y, inViewport: inside, hit: identity(hit), hitTarget: hit !== null && (hit === node || node.contains(hit)) };
  };
  const unionRect = rectangle(node.getBoundingClientRect());
  const unionCenter = probe(unionRect.x + unionRect.width / 2, unionRect.y + unionRect.height / 2);
  const clientRects = [...node.getClientRects()].map((rect, index) => ({ index, ...rectangle(rect) })).filter(rect => positive(rect));
  const candidates = clientRects.map(rect => ({ rectIndex: rect.index, rectInView: inViewport(rect),
    ...probe(rect.x + rect.width / 2, rect.y + rect.height / 2) }));
  const selected = candidates.find(candidate => candidate.rectInView && candidate.inViewport && candidate.hitTarget);
  const inView = inViewport(unionRect);
  const visible = node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  const disabled = !!node.disabled || node.getAttribute("aria-disabled") === "true";
  const focused = doc.activeElement === node, hitTarget = !!selected;
  const actionable = inView && visible && hitTarget && !disabled;
  const pointerPoint = actionable ? { x: selected.x, y: selected.y, rectIndex: selected.rectIndex } : null;
  return { x: unionRect.x, y: unionRect.y, width: unionRect.width, height: unionRect.height,
    inView, visible, hitTarget, focused, disabled, actionable, pointerPoint,
    viewport, unionRect, unionCenter, clientRects, candidates };
}
