I’ll record your approval and build the opening, radio observation and ending in the three proposed looks. That will give you a working scroll sequence to compare before I build the remaining chapters.


The spine now separates the radio observation from the unknown cause, fix, timing and outcome. I’m also building the Mosslink page and printable HTML CV so the opening’s project and download links work during your review.


The production build is running through all three looks at desktop, short-screen and phone sizes, plus reduced motion and 3D fallbacks. I’m also checking the CV download, print layout, missing-page links and scroll transitions in both directions.


Visual review caught the chapter rail overlapping a fixture label. I’ve removed that rail, kept ordinary chapter links, and made the site navigation stay visible while scrolling. The Mosslink page, HTML CV download and missing-page links passed their functional checks; I’m rerunning the production checks after the layout change.


I found a transition issue too: two modules crossed paths as the fixture opened. I’ve changed the observation pose so modules keep their column order, making the observed-versus-unknown separation easier to follow. Face labels switch cleanly during travel, and I’m checking the revised movement in both scroll directions.


Which appearance should the portfolio use? Start it with `cd site && npm run dev`, then compare http://127.0.0.1:3000/?look=warm, ?look=dark and ?look=lab. Each has the opening, observation and ending.
- Warm bench (Recommended) — warm off-white, green fixture bodies and brass contacts
- Instrument dark — blue-black background, graphite bodies and amber accents
- Clean lab — pale grey, grey-green bodies and brushed-metal contacts

The revised transitions passed visual review, and the CV download and print layout are working. You can now compare the three looks while I finish the browser checks. I recommend Warm bench: the green fixture bodies and brass contacts stay clear against the light background.


All 18 production browser cases passed. Visual review also caught the appearance-study note crowding the heading in the text fallback. I’ve moved the fallback controls and note into normal page flow and am checking that layout again.

