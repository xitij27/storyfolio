I’ll record your storyboard approval and build the remaining features, including the map corrections, CV, navigation and accessibility improvements, share preview, icon and missing-page page. I’ll keep everything local and retain the current appearance.


The education card now has an explicit Addis Ababa location. I’m also making the map visit tools and work cards more closely on phones, adding keyboard access to every work item, and separating the captions from the scene so they don’t cover it.


The printable CV, standalone HTML download, share artwork, icon and custom 404 page are built. I’m now checking the interactions: chapter links, all six work windows, focus and Escape handling, text fallback, the downloaded CV without a server, and print layout.


The map corrections and CV are in place, and the production checks have passed so far. I’ve also built three opening and closing wording options at `/wording`, with links to scroll each version in the site. The homepage keeps its current wording until you choose.


The site retains your current opening and closing words. Optional: review the three complete alternatives at http://127.0.0.1:3000/wording and choose whether to keep the current wording or change it.
- Keep the current wording (Recommended)
- Use version 1 for opening and close
- Choose different versions or supply my own

The keyboard check caught a focus issue when a work window has only its Close button: Tab can leave the window. I’ll add an explicit focus loop, then rerun the interaction checks.


The focus fix passes the keyboard checks, and navigation and layout checks have passed on phone, small-phone and short-screen sizes. I’m finishing the CV and share-preview checks and reviewing the screenshots. Your earlier instruction to keep the existing wording still stands; the alternatives are optional.


Visual review caught two small-screen issues: the camera doubled back along the work cards, and the smallest layout hid the last controls inside the caption’s scroll area. I’ve made the camera follow your six-item order and tightened the controls to fit. The offline CV and print check passed; the print output is three A4 pages.


All eight interaction checks pass, including keyboard navigation, browser Back, offline CV use, print, context-loss fallback and the 404 page. I’m saving the handover and running a final production check after removing a few authoring notes from the project text. Publishing remains outside this task.


Built and running locally: **[Open your portfolio](http://127.0.0.1:3000)**.

The map story now includes all six work windows, keyboard navigation, readable text fallbacks, corrected education placement, share artwork, icon and a useful 404 page.

- [Printable CV](http://127.0.0.1:3000/cv)
- [Download standalone HTML CV](http://127.0.0.1:3000/downloads/dawit-bekele-cv.html)
- [Optional wording comparisons](http://127.0.0.1:3000/wording)

Your map, night appearance and existing wording are retained.

All 185 tests, type/lint checks, production browser checks and eight interaction checks passed. Desktop, phone and short-screen screenshots were inspected. Your own phone and content review remain.

Nothing was published, and no additional skills were installed.
