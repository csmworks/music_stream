import React from 'react';
import { usePlayer } from '../App';
import { BannerAd } from './AdComponents';
import { MusicNoteIcon } from '../constants';

const TrackItem: React.FC<{ trackIndex: number }> = ({ trackIndex }) => {
    const { tracks, playTrack } = usePlayer();
    const track = tracks[trackIndex];

    if (!track) return null;

    return (
        <button 
            onClick={() => playTrack(trackIndex)}
            className="group bg-zinc-900/50 hover:bg-zinc-800/80 transition-all duration-300 p-4 rounded-lg text-left flex flex-col gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label={`Play ${track.title} by ${track.artist}`}
        >
            <div className="relative">
                <img src={track.albumArtUrl} alt={track.title} className="w-full aspect-square rounded-md shadow-lg" />
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-white truncate">{track.title}</p>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
        </button>
    );
}

const HomePage: React.FC = () => {
    const { tracks } = usePlayer();

    return (
        <div className="flex-grow overflow-y-auto">
             <header className="sticky top-0 z-10 p-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <MusicNoteIcon className="w-8 h-8 text-emerald-400"/>
                        <h1 className="text-2xl font-bold text-white">Music Streamer</h1>
                    </div>
                    <BannerAd className="w-72 h-12 hidden md:flex" />
                </div>
            </header>
            <main className="p-4">
                <h2 className="text-2xl font-bold text-white mb-4">Discover Music</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tracks.map((_, index) => (
                        <TrackItem key={index} trackIndex={index} />
                    ))}
                </div>
                 <div className="mt-8 md:hidden">
                    <BannerAd className="w-full h-16"/>
                </div>
            </main>
             <footer className="sticky bottom-0 p-4 bg-black/80 backdrop-blur-sm mt-8 border-t border-zinc-800">
                <BannerAd className="w-full h-20" />
            </footer>
        </div>
    );
};

export default HomePage;
