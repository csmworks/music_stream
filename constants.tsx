import React from 'react';
import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: 1,
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/1/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/2/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/3/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "SoundHelix Song 4",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/4/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "SoundHelix Song 5",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/5/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
   {
    id: 6,
    title: "SoundHelix Song 6",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/6/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: 7,
    title: "SoundHelix Song 7",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/7/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: 8,
    title: "SoundHelix Song 8",
    artist: "SoundHelix",
    albumArtUrl: "https://picsum.photos/seed/8/300/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  }
];


export const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

export const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

export const SkipNextIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
);

export const SkipPreviousIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" /></svg>
);

export const MusicNoteIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path></svg>
);

export const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
);