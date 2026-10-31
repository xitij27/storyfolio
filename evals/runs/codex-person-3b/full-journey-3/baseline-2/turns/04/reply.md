I’ll record your storyboard approval and build the whole site in three looks for you to compare locally: Night, Daylight and Blueprint. The next decision is the look; publishing stays outside this task.


The three previews now share the same site layout, including its header and navigation. I’m refining the phone framing so documents fit on screen, and adding readable HTML captions for the book’s career spread.


All seven chapters are available in [Night](http://127.0.0.1:3000/preview?look=night), [Daylight](http://127.0.0.1:3000/preview?look=daylight) and [Blueprint](http://127.0.0.1:3000/preview?look=blueprint). The switcher lets you compare them at the same scroll position.

I recommend Blueprint for its cool paper, deep blue ground and amber accents. I’m checking the full scroll and book transitions in each look.


Which look should I use for the site? Compare the complete local previews: Blueprint at http://127.0.0.1:3000/preview?look=blueprint, Night at http://127.0.0.1:3000/preview?look=night, and Daylight at http://127.0.0.1:3000/preview?look=daylight. The storyfolio building instructions require your look choice before I build the detail pages and CV.
- Blueprint — cool paper, deep blue, amber (recommended)
- Night — cream paper, charcoal, amber
- Daylight — pale paper, warm grey, ochre

The checks found a few issues in the new presentation. I’m inspecting the reports and screenshots before handing over the look comparison.


The failures were cancelled background page prefetches; the scenes and text fallbacks loaded. I’ve disabled those unnecessary prefetches and am rerunning the checks. The screenshots also confirm that the phone view now shows whole documents and book spreads.


The desktop rerun is clear. The phone review shows whole book spreads with an HTML career caption, and the opening proof no longer persists over later scenes. I’m finishing the palette and navigation checks; the CV, detail pages and wording remain queued for after your look choice.


The updated site has passed the production checks: 39 scene screenshots, working text fallbacks without JavaScript or WebGL, and no reported errors. I’ve also visually checked the phone career caption and contact layout. The remaining checks cover the three preview palettes and comparison controls.


Night has passed at desktop and phone sizes, and Daylight is progressing without reported errors. Each preview uses the accepted story and mix, including the employment book. The active palette also colours the header, captions and comparison controls.


Daylight has passed too. Visual review caught the floating comparison bar covering a map label on desktop, so I’ve moved it into the header on wide screens. I’ll verify that adjustment after the Blueprint and interaction checks finish.


All three looks and the comparison controls have passed. Switching looks preserved the scroll position, query values and chapter link; named navigation and the no-JavaScript preview also worked. I’m finishing a visual check of the desktop header adjustment.


The wide-screen header adjustment is clear. The short-screen check caught city names behind the header, so I’ve added more map clearance for that viewport. I’m checking the correction in all three palettes.


Your approved seven-chapter scroll is built in three complete looks:

- [Blueprint](http://127.0.0.1:3000/preview?look=blueprint) — cool paper, deep blue, amber. **My recommendation.**
- [Night](http://127.0.0.1:3000/preview?look=night) — cream paper and charcoal.
- [Daylight](http://127.0.0.1:3000/preview?look=daylight) — pale paper and warm grey.

I also improved phone framing, added named navigation and a text view, and fixed controls covering map labels. Tests, lint, production builds and browser checks passed. Everything remains local.

To run:

```bash
npm run dev --prefix site -- --hostname 127.0.0.1
```

**Which look should I use?**

The [storyfolio skill](/var/tmp/storyfolio-person-3/storyfolio-evals/build-full-journey-3-CBNiA8/.agents/skills/storyfolio/SKILL.md) requires “They have chosen a look” before the next stage. The six detail pages, CV and wording choices follow your selection.
