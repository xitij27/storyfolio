// Keep framework update checks and other Node fetches local during this project.
const originalFetch = globalThis.fetch;
globalThis.fetch = function localFetch(input, init) {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    return Promise.reject(new Error('This project runs locally; external fetch is disabled.'));
  }
  return originalFetch(input, init);
};
process.env.NEXT_TELEMETRY_DISABLED = '1';
