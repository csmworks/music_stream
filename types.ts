import { ReactNode } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  albumArtUrl: string;
  audioSrc: string;
}

export interface PlayerContextType {
  tracks: Track[];
  currentTrack: Track | null;
  currentTrackIndex: number | null;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  duration: number;
  view: 'home' | 'player';
  playTrack: (trackIndex: number) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (value: number) => void;
  setView: (view: 'home' | 'player') => void;
}

export interface PlayerProviderProps {
    children: ReactNode;
}