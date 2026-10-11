import { TRAVEL } from "../lib/story/timeline.ts";

/** Empty ignore values mean no exception. A nonempty value is an explicit regex. */
export function optionalPattern(value) {
  return value ? new RegExp(String(value)) : null;
}

export function expectedRequestReason({ url, resourceType, failure }, { ignore = null, block = null, noJavaScript = false, pageUrl } = {}) {
  if (block?.test(url)) return "intentionally blocked request";
  if (ignore?.test(url)) return "explicit ignore pattern";
  if (noJavaScript && resourceType === "script" && ["csp", "net::ERR_BLOCKED_BY_CSP"].includes(failure)) {
    try {
      const request = new URL(url);
      if (request.origin === new URL(pageUrl).origin && /^\/_next\/static\/.+\.js$/.test(request.pathname)) {
        return "JavaScript-disabled CSP rejection of a same-origin Next.js script preload";
      }
    } catch { /* Invalid URLs cannot qualify for this narrow exception. */ }
  }
  return null;
}

export function requestProblem({ url, status, failure, resourceType }, options = {}) {
  if (expectedRequestReason({ url, resourceType, failure }, options)) return null;
  if (failure) return `request failed (${failure}): ${url}`;
  return status >= 400 ? `HTTP ${status}: ${url}` : null;
}

export function storyContract(story, looks) {
  const ids = story.chapters.flatMap(chapter => chapter.beats.map(beat => beat.id));
  if (!ids.length || new Set(ids).size !== ids.length || ids.some(id => !/^[\w.-]+$/.test(id))) {
    throw new Error("The check contract needs unique, nonempty beat IDs");
  }
  const lookIds = looks.map(look => look.id);
  if (!lookIds.length || new Set(lookIds).size !== lookIds.length) throw new Error("The check contract needs unique look IDs");
  return { ids, lookIds };
}

/** The contract comes from content, never from whatever the first browser happened to render. */
export function checkMatrix({ ids, lookIds }, probes = {}) {
  const common = [`--expect-beats=${ids.length}`, `--expect-ids=${ids.join(",")}`, "--beats", "--inside=.story-control"];
  const matrix = [];
  for (const look of lookIds) {
    const expected = [...common, `--expect-look=${look}`];
    matrix.push(
      { name: `${look}-wide`, look, flags: [...expected, "--size=1440x900", "--expect-scene=on", "--positions=start,mid,end", "--late-shaders=40000"] },
      { name: `${look}-short`, look, flags: [...expected, "--size=1280x720", "--expect-scene=on", "--late-shaders=40000"] },
      { name: `${look}-phone`, look, flags: [...expected, "--size=390x844", "--touch", probes.staticPhone ? "--expect-scene=off" : "--expect-scene=on", ...(probes.staticPhone ? ["--hidden=canvas"] : [])] },
      { name: `${look}-reduced`, look, flags: [...expected, "--size=1440x900", "--reduced-motion", probes.staticReduced ? "--expect-scene=off" : "--expect-scene=on", "--positions=start,mid,end", ...(probes.staticReduced ? ["--hidden=canvas"] : ["--assert-still=300"])] },
      { name: `${look}-no-webgl`, look, flags: [...expected, "--size=1440x900", "--no-webgl", "--expect-scene=off"] },
    );
  }
  matrix.push(
    { name: "no-js", look: lookIds[0], flags: [...common, "--size=1440x900", "--no-js", "--expect-selector=h1", "--hidden=canvas,.story-look-switch,.story-control"] },
    { name: "context-loss", look: lookIds[0], flags: [...common, "--size=1440x900", "--lose-context", "--expect-scene=off"] },
  );
  if (lookIds.length > 1) matrix.push({ name: "look-switch", look: lookIds[0], flags: [...common, "--size=1440x900", "--expect-scene=on", `--look-cycle=${lookIds.slice(0, 2).join(",")}`, `--expect-look=${lookIds[0]}`] });
  if (probes.overlay) {
    if (!ids.includes(probes.overlay.beat) || !probes.overlay.selector) throw new Error("The overlay probe needs a declared beat and selector");
    matrix.push({ name: "keyboard-overlay", look: lookIds[0], flags: [...common, "--size=1440x900", "--expect-scene=on", `--keyboard=${probes.overlay.selector}`, `--keyboard-at=${probes.overlay.beat}`] });
  }
  if (probes.lazyExtra) matrix.push({ name: "failed-extra", look: lookIds[0], flags: [...common, "--size=1440x900", "--expect-scene=on", "--block-late-chunks"] });
  return matrix;
}
/** Match playhead's rest intervals, including arrival before later blocks reach the top. */
export function beatRestSamples(boxes, viewport, positions = ["end"]) {
  let arrived = 0;
  const travel = Math.max(1, TRAVEL * viewport);
  return boxes.map(box => {
    const leaves = Math.max(arrived, box.top + box.height - viewport);
    const samples = positions.map(position => ({
      position,
      top: arrived + (leaves - arrived) * ({ start: 0, mid: 0.5, end: 1 }[position]),
    }));
    arrived = leaves + travel;
    return samples;
  });
}

