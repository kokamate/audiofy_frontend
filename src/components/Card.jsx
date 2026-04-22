import React, { useRef, useState, useEffect } from "react";
import "../css/Home.css";
import { useMusic } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";

export default function Card({ name, title, image, song, songObj, isInPlaylist = false, onTogglePlaylist }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const navigate = useNavigate();

    const { playSong, likedSongs, toggleLike, registerAudioRef, unregisterAudioRef, playlistModeActive } = useMusic();

    if (!songObj) {
        console.error("Card: songObj prop is missing!");
        return <div>Hiba: Nincs zene adat</div>;
    }

    const songID = String(songObj.songID);
    const isLiked = likedSongs.includes(songID);
    const disabledPlay = playlistModeActive && !isInPlaylist;

    const handleLike = async () => {
        await toggleLike(songID);
    };

    const togglePlay = () => {
        if (!audioRef.current || disabledPlay) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            playSong(audioRef.current);
        }
    };

    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        audioRef.current.volume = vol;
    };

    const handleProgressChange = (e) => {
        const time = e.target.value;
        setProgress(time);
        audioRef.current.currentTime = time;
    };

    const formatTime = (sec) => {
        if (isNaN(sec)) return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const getVolumeIcon = () => {
        if (volume === 0) return "🔇";
        if (volume <= 0.5) return "🔈";
        return "🔊";
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            registerAudioRef(songID, audio);
        }

        return () => {
            unregisterAudioRef(songID);
        };
    }, [songID, registerAudioRef, unregisterAudioRef]);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const updateProgress = () => setProgress(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration || 0);
        const handleEnded = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", setAudioDuration);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    return (
        <div className="card">
            <div className="cover">
                <img src={image} alt={title} />
                <button
                    onClick={togglePlay}
                    className={`play${disabledPlay ? ' disabled-play' : ''}`}
                    disabled={disabledPlay}
                    title={disabledPlay ? 'Csak a kiválasztott playlist dalai játszhatók.' : 'Lejátszás'}
                >
                    {isPlaying ? "❚❚" : "▶"}
                </button>
                {onTogglePlaylist && (
                    <button
                        type="button"
                        className={`playlist-btn ${isInPlaylist ? 'in-playlist' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onTogglePlaylist(songID);
                        }}
                        title={isInPlaylist ? 'Eltávolítás a lejátszási listából' : 'Hozzáadás a lejátszási listához'}
                    >
                        {isInPlaylist ? '✓' : '+'}
                    </button>
                )}
                <button onClick={handleLike} className={`like-btn ${isLiked ? 'liked' : ''}`}>
                    {isLiked ? '❤️' : '🤍'}
                </button>
            </div>

            <h3>{name}</h3>
            <p>{title}</p>

            {/* Csak akkor jelenik meg, ha a zene szól */}
            {isPlaying && (
                <div className="mini-audio">
                    <span className="time">{formatTime(progress)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={progress}
                        onChange={handleProgressChange}
                        className="progress-slider"
                    />
                    <span className="time">{formatTime(duration - progress)}</span>

                    <span className="volume-icon">{getVolumeIcon()}</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                    />
                </div>
            )}

            <audio ref={audioRef} src={song} />
        </div>
    );
}