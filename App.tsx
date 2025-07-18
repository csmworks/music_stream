
import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';
import { TRACKS } from './constants';
import { Track, PlayerContextType, PlayerProviderProps } from './types';
import HomePage from './components/HomePage';
import { PlayerBar, PlayerPage } from './components/PlayerUI';
import { InterstitialAd } from './components/AdComponents';

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = (): PlayerContextType => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};


const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [tracks] = useState<Track[]>(TRACKS);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [view, setView] = useState<'home' | 'player'>('home');
    const [listenTime, setListenTime] = useState<number>(0);
    const [showInterstitial, setShowInterstitial] = useState<boolean>(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const preloadAudioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;
    const INTERSTITIAL_INTERVAL_SECONDS = 1800; // 30 minutes

    const playTrack = useCallback((trackIndex: number) => {
        setCurrentTrackIndex(trackIndex);
        setIsPlaying(true);
    }, []);

    const playNext = useCallback(() => {
        if (currentTrackIndex !== null) {
            const nextIndex = (currentTrackIndex + 1) % tracks.length;
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true);
        }
    }, [currentTrackIndex, tracks.length]);

    const playPrev = useCallback(() => {
        if (currentTrackIndex !== null) {
            const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            setCurrentTrackIndex(prevIndex);
            setIsPlaying(true);
        }
    }, [currentTrackIndex, tracks.length]);
    
    const togglePlayPause = useCallback(() => {
        if (currentTrackIndex === null && tracks.length > 0) {
            setCurrentTrackIndex(0);
        }
        setIsPlaying(prev => !prev);
    }, [currentTrackIndex, tracks.length]);

    const seek = useCallback((value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setProgress(value);
        }
    }, []);

    // Effect for preloading the next track
    useEffect(() => {
        if (currentTrackIndex === null) return;
        const preloadAudio = preloadAudioRef.current;
        if (!preloadAudio) return;

        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        const nextTrack = tracks[nextIndex];
        
        if (nextTrack) {
            preloadAudio.src = nextTrack.audioSrc;
        }
    }, [currentTrackIndex, tracks]);


    // This single effect manages all audio interactions.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Error playing audio:", error.message);
                    setIsPlaying(false);
                }
            });
        } else {
            audio.pause();
        }

        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);
        const updateProgress = () => setProgress(audio.currentTime || 0);
        const updateDuration = () => setDuration(audio.duration || 0);
        const handleEnded = () => playNext();

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('playing', handlePlaying);
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack, isPlaying, playNext]);


    useEffect(() => {
        let timer: number | undefined;
        if (isPlaying && !showInterstitial) {
            timer = setInterval(() => {
                setListenTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, showInterstitial]);

    useEffect(() => {
        if (listenTime >= INTERSTITIAL_INTERVAL_SECONDS) {
            setShowInterstitial(true);
            setIsPlaying(false);
        }
    }, [listenTime]);

    const handleCloseInterstitial = () => {
        setShowInterstitial(false);
        setListenTime(0);
        if (currentTrackIndex !== null) {
            setIsPlaying(true);
        }
    };

    const value: PlayerContextType = {
        tracks,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        isLoading,
        progress,
        duration,
        view,
        playTrack,
        togglePlayPause,
        playNext,
        playPrev,
        seek,
        setView,
    };

    return (
        <PlayerContext.Provider value={value}>
            <audio ref={audioRef} src={currentTrack?.audioSrc} />
            <audio ref={preloadAudioRef} />
            {showInterstitial && <InterstitialAd onClose={handleCloseInterstitial} />}
            {children}
        </PlayerContext.Provider>
    );
};

function App() {
    return (
        <PlayerProvider>
            <AppContent />
        </PlayerProvider>
    );
}

const AppContent = () => {
    const { view, currentTrack } = usePlayer();
    
    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
            {view === 'home' ? <HomePage /> : <PlayerPage />}
            {currentTrack && <PlayerBar />}
        </div>
    );
}

export default App;