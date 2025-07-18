import React from 'react';
import { usePlayer } from '../App';
import { PlayIcon, PauseIcon, SkipNextIcon, SkipPreviousIcon, ChevronLeftIcon } from '../constants';
import { BannerAd } from './AdComponents';

const LoadingSpinner: React.FC<{className?: string}> = ({ className="w-5 h-5" }) => (
    <div className={`${className} border-2 border-black/50 border-t-black rounded-full animate-spin`}></div>
);

const FullPageLoadingSpinner: React.FC<{className?: string}> = ({ className="w-8 h-8" }) => (
    <div className={`${className} border-4 border-black/50 border-t-black rounded-full animate-spin`}></div>
);

const ProgressBar: React.FC = () => {
    const { progress, duration, seek } = usePlayer();

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
            <input
                type="range"
                min="0"
                max={duration || 1}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm accent-emerald-400"
                aria-label="Seek progress"
            />
            <span className="text-xs text-gray-400 w-10 text-left">{formatTime(duration)}</span>
        </div>
    );
}

export const PlayerBar: React.FC = () => {
    const { currentTrack, isPlaying, isLoading, togglePlayPause, playNext, playPrev, setView } = usePlayer();

    if (!currentTrack) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            setView('player');
        }
    }

    return (
        <div className="sticky bottom-0 z-20 w-full bg-zinc-900 border-t border-zinc-800 p-2 text-white">
            <div className="flex items-center justify-between">
                <div 
                    className="flex items-center gap-3 w-1/3 cursor-pointer rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-emerald-400" 
                    onClick={() => setView('player')}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label={`Now playing: ${currentTrack.title} by ${currentTrack.artist}. Open full player view.`}
                >
                    <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="w-12 h-12 rounded" />
                    <div>
                        <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
                        <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 w-1/3">
                    <div className="flex items-center gap-4">
                        <button onClick={playPrev} aria-label="Previous track" className="text-gray-400 hover:text-white transition-colors"><SkipPreviousIcon /></button>
                        <button 
                            onClick={togglePlayPause} 
                            aria-label={isPlaying ? "Pause" : "Play"} 
                            className="bg-white text-black rounded-full p-2 w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform"
                            disabled={isLoading}
                        >
                            {isLoading ? <LoadingSpinner /> : (isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />)}
                        </button>
                        <button onClick={playNext} aria-label="Next track" className="text-gray-400 hover:text-white transition-colors"><SkipNextIcon /></button>
                    </div>
                    <ProgressBar />
                </div>
                <div className="w-1/3">
                    {/* Volume controls could go here */}
                </div>
            </div>
        </div>
    );
}


export const PlayerPage: React.FC = () => {
    const { currentTrack, isPlaying, isLoading, togglePlayPause, playNext, playPrev, setView } = usePlayer();
    
    if (!currentTrack) {
        setView('home');
        return null;
    }

    return (
        <div className="fixed inset-0 z-30 bg-gradient-to-b from-emerald-800 to-black text-white flex flex-col p-4">
            <header className="flex-shrink-0">
                <button onClick={() => setView('home')} className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors">
                    <ChevronLeftIcon />
                    Back to Library
                </button>
            </header>
            
            <main className="flex-grow flex flex-col items-center justify-center gap-8">
                 <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="w-64 h-64 md:w-80 md:h-80 rounded-lg shadow-2xl" />
                 <div className="text-center">
                    <h2 className="text-3xl font-bold">{currentTrack.title}</h2>
                    <p className="text-lg text-gray-300">{currentTrack.artist}</p>
                 </div>
                 <div className="w-full max-w-md">
                     <ProgressBar />
                 </div>
                 <div className="flex items-center gap-8">
                    <button onClick={playPrev} aria-label="Previous track" className="text-gray-400 hover:text-white transition-colors"><SkipPreviousIcon className="w-8 h-8" /></button>
                    <button 
                        onClick={togglePlayPause} 
                        aria-label={isPlaying ? "Pause" : "Play"} 
                        className="bg-white text-black rounded-full p-4 w-20 h-20 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? <FullPageLoadingSpinner /> : (isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />)}
                    </button>
                    <button onClick={playNext} aria-label="Next track" className="text-gray-400 hover:text-white transition-colors"><SkipNextIcon className="w-8 h-8" /></button>
                </div>
            </main>
            
            <footer className="flex-shrink-0 mt-auto">
                <BannerAd className="w-full h-20"/>
            </footer>
        </div>
    );
}