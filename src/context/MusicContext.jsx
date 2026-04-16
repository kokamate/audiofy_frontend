import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getLikedSongs, toggleLikeSong } from "../api";

const MusicContext = createContext();

export function MusicProvider({ children }) {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [likedSongs, setLikedSongs] = useState([]);
    const [playlistModeActive, setPlaylistModeActive] = useState(false);
    const [currentPlaylistSongIDs, setCurrentPlaylistSongIDs] = useState([]);
    const audioRefs = useRef(new Map());

    const fetchLikedSongs = async () => {
        console.log("Fetching liked songs...");
        const data = await getLikedSongs();
        console.log("Liked songs response:", data);
        if (data.error) {
            console.error("Error fetching liked songs:", data.error);
        } else if (Array.isArray(data)) {
            const likedIds = data.map(id => String(id));
            console.log("Liked IDs set:", likedIds);
            setLikedSongs(likedIds);
        } else {
            console.warn("Unexpected data format:", data);
        }
    };

    useEffect(() => {
        fetchLikedSongs();
    }, []);

    const playSong = (audioRef) => {
        if (currentAudio && currentAudio !== audioRef) {
            currentAudio.pause();
        }
        setCurrentAudio(audioRef);
        audioRef.play();
    };

    const stopCurrent = () => {
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
        }
    };

    const registerAudioRef = (songID, audioElement) => {
        if (!songID || !audioElement) return;
        audioRefs.current.set(String(songID), audioElement);
    };

    const unregisterAudioRef = (songID) => {
        if (!songID) return;
        audioRefs.current.delete(String(songID));
    };

    const startPlaylist = async (songIDs) => {
        if (!Array.isArray(songIDs) || songIDs.length === 0) {
            return { error: "A playlist nem tartalmaz dalokat." };
        }

        setCurrentPlaylistSongIDs(songIDs.map(String));
        setPlaylistModeActive(true);

        const firstID = String(songIDs[0]);
        const firstAudio = audioRefs.current.get(firstID);
        if (!firstAudio) {
            return { error: "A playlist első dala nem érhető el. Kérlek próbáld újra." };
        }

        playSong(firstAudio);
        return { success: true };
    };

    const stopPlaylist = () => {
        setPlaylistModeActive(false);
        setCurrentPlaylistSongIDs([]);
        stopCurrent();
    };

    const toggleLike = async (songID) => {
        console.log("Toggling like for:", songID);
        const data = await toggleLikeSong(songID);
        console.log("Toggle response:", data);
        if (data.error) {
            console.error("Toggle error:", data.error);
            return data;
        }
        console.log("Refreshing liked songs list...");
        await fetchLikedSongs();
        return data;
    };

    return (
        <MusicContext.Provider value={{
            playSong,
            stopCurrent,
            currentAudio,
            likedSongs,
            toggleLike,
            registerAudioRef,
            unregisterAudioRef,
            startPlaylist,
            stopPlaylist,
            playlistModeActive,
            currentPlaylistSongIDs,
        }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    return useContext(MusicContext);
}