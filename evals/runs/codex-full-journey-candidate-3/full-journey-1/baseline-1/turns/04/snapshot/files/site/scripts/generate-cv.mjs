import {writeFileSync} from 'node:fs';
import {cvMarkup,cvStyles} from '../content/cv.ts';
writeFileSync('public/downloads/ada-mensah-cv.html',`<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ada Mensah — Embedded firmware CV</title><meta name="description" content="Mosslink firmware, bring-up fixture and evidence limits."><style>${cvStyles}</style></head><body><main>${cvMarkup}</main></body></html>\n`);
