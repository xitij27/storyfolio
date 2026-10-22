import type {StoryBundle} from '@/components/story/types';
import {story} from './story';
import {formations} from './formations';
import {faces} from './faces';
import {looks} from './looks';
import {copy} from './copy';
import {FixtureBar} from './fixture';
export const bundle={story,formations,faces,looks,copy,Piece:FixtureBar,defaultLook:'light'} satisfies StoryBundle;
