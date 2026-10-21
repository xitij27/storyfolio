I’ll record your storyboard approval and build the opening, Access middle and Record ending in both proposed looks. Then you can compare them by scrolling and choose the look for the remaining chapters. Everything stays local.


The fixture now has solid bases, contact housings and upright probes, with the same seven segments carried through each scene. I’m making the Access view show command, fixture access and observation as separate groups, and giving the projection and longest run equal visual weight. All numbers and caveats will also remain in ordinary HTML.


The local preview now includes the opening, Access and Record scenes, plus the Mosslink page, HTML CV, site icon, share preview and recovery page. I’m checking both finishes across desktop, phone and short windows, along with keyboard access, reduced motion and the text fallback when 3D is unavailable.


Both desktop finishes and the aluminium phone layout are rendering without horizontal overflow. The supporting-page check caught a missing share image on the Mosslink page; I’m fixing that metadata. The local CV download and real 404 response passed. The longer check run was interrupted, so I’m completing the remaining cases in shorter batches.


The reduced-motion check passed: the fixture stays still between scroll changes. The story also remains readable without JavaScript or WebGL. I’m finishing the look-switch and transition checks before handing you the two local finishes to choose from.


The darker finish failed one stationary-image check. I’ve removed automatic resolution changes in reduced-motion mode and am rerunning that check. The look switch preserves the reader’s position, and simulated WebGL loss correctly leaves the text fallback available.


The darker finish now passes the stationary-image check. A final phone check showed the fixture crowding the chapter label before the scene pins to the screen; I’ve adjusted the framing to account for the header above it. I’m verifying that opening view now.


The opening, Access middle and Record ending now run locally with the same 3D fixture throughout. The Mosslink page, printable/downloadable HTML CV, icon, share preview and useful 404 are also built.

```bash
cd site
npm run local
```

Compare by scrolling:

- [Aluminium](http://127.0.0.1:3000/?look=light): warm white, graphite and copper.
- [Anodized](http://127.0.0.1:3000/?look=dark): dark blue-grey, ivory and teal.

I recommend **Aluminium**, which fits the supplied teaching drawings. Desktop/phone layouts, fallbacks, reduced motion and local downloads have been checked. Nothing is published.

**Which finish should I use for the remaining Command and Observe chapters?**

The [storyfolio skill](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-1-zdvnMZ/.agents/skills/storyfolio/SKILL.md) requires “They have chosen a look” before continuing beyond this runnable comparison.
