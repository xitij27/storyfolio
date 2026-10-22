# Local concept review

From this folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000/ for the three-concept gallery.

- http://127.0.0.1:3000/sketch/runbook
- http://127.0.0.1:3000/sketch/checklist
- http://127.0.0.1:3000/sketch/rollback

To review the already built production version instead:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Do not run dev and start together on the same port. These commands listen only on your machine. No deployment, public domain, hosting account or mail-sending functionality exists.

The concept sketches each contain an opening, middle and ending. Scroll the middle to move an explicitly illustrative migration model; the reverse button changes its direction. This is not a depiction of actual Kestrel infrastructure or procedure. Text and details are ordinary HTML.

The chosen site's remaining chapters, five full work details, printable/downloadable HTML CV, share preview, site icon and useful missing page are still to be built after concept selection and storyboard approval. Current sketches are for selecting the object and motion language; final wording and looks come later. No testimonials, photos, slides, blogs, chat, translation or contact form are planned.

Factual answers, concept proposals, decisions and continuation notes live one directory above this site, in docs/story/. Do not use the original resume's superseded or unconfirmed claims when writing more copy.

Validation at this stage: production build and its TypeScript pass; standalone typecheck pass; lint pass; 129 engine tests pass. All three sketch routes inspected in Chromium at 1440×1000 and 390×844, opening/middle/ending, with zero page errors, zero horizontal overflow and zero external browser requests. Reverse buttons return aria-pressed=true. These are concept checks, not final full-site acceptance or phone performance measurements. Browser report and screenshots: ../local-check/.
