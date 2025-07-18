import React, { useState, useEffect } from 'react';

interface BannerAdProps {
  className?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ className }) => {
  return (
    <div className={`bg-gray-700/50 border border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}>
      <p>BANNER AD</p>
    </div>
  );
};


interface InterstitialAdProps {
    onClose: () => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({ onClose }) => {
    const [closeTimer, setCloseTimer] = useState(5);

    useEffect(() => {
        if (closeTimer > 0) {
            const timer = setTimeout(() => setCloseTimer(closeTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [closeTimer]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-zinc-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-4 text-white relative border border-zinc-700">
                <div className="absolute top-2 right-2">
                    {closeTimer > 0 ? (
                        <span className="text-xs text-gray-400 bg-black/50 rounded-full px-2 py-1">You can close in {closeTimer}s</span>
                    ) : (
                        <button onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white rounded-full px-3 py-1 text-sm transition-colors">Close</button>
                    )}
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-center mb-2">Advertisement</h3>
                     <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
                        <p className="text-zinc-500">Video Ad Placeholder</p>
                    </div>
                    <p className="text-xs text-zinc-500 text-center mt-2">Your music will resume shortly.</p>
                </div>
            </div>
        </div>
    );
};
