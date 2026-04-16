// NavBar.jsx
import { Link } from "react-router-dom";
import "../css/Home.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import { useMusic } from "../context/MusicContext";
import { getPlaylists, createPlaylist, getPlaylistSongs, addSongToPlaylist, removeSongFromPlaylist } from "../api";

export function NavBar({ user, onLogout }) {
    const [musics, setMusics] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [selectedPlaylistName, setSelectedPlaylistName] = useState("");
    const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [playlistError, setPlaylistError] = useState("");
    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [sidebarMessage, setSidebarMessage] = useState("");

    const { startPlaylist, stopPlaylist, playlistModeActive } = useMusic();

    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    const fetchMusics = async () => {
        try {
            const res = await fetch("http://127.0.0.1:4562/user/musics");
            const data = await res.json();
            setMusics(data || []);
        } catch (err) {
            console.error("Hiba a zenék betöltésekor:", err);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const data = await getPlaylists();
            if (data?.error) {
                setPlaylistError(data.error);
                setPlaylists([]);
                return;
            }
            setPlaylists(data);
            if (!selectedPlaylistId && data.length > 0) {
                setSelectedPlaylistId(data[0].playlistID);
                setSelectedPlaylistName(data[0].name);
                fetchPlaylistSongs(data[0].playlistID, data[0].name);
            }
        } catch (err) {
            console.error("Playlistek betöltési hiba:", err);
            setPlaylistError("Playlistek betöltési hiba");
        }
    };

    const fetchPlaylistSongs = async (playlistID, playlistName = selectedPlaylistName) => {
        if (!playlistID) {
            setSelectedPlaylistSongs([]);
            return;
        }

        setPlaylistLoading(true);
        setPlaylistError("");
        try {
            const data = await getPlaylistSongs(playlistID);
            if (data?.error) {
                setPlaylistError(data.error);
                setSelectedPlaylistSongs([]);
            } else {
                setSelectedPlaylistSongs(data);
                setSelectedPlaylistName(playlistName);
            }
        } catch (err) {
            console.error("Playlist számok betöltési hiba:", err);
            setPlaylistError("Playlist számok betöltési hiba");
            setSelectedPlaylistSongs([]);
        } finally {
            setPlaylistLoading(false);
        }
    };

    useEffect(() => {
        fetchMusics();
        fetchPlaylists();
    }, []);

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) {
            setSidebarMessage("Adj nevet a lejátszási listának!");
            return;
        }

        const result = await createPlaylist(newPlaylistName.trim());
        if (result?.error) {
            setSidebarMessage(result.error);
            return;
        }

        setNewPlaylistName("");
        setSidebarMessage("Lejátszási lista létrehozva.");
        await fetchPlaylists();
    };

    const isInPlaylist = (songID) => selectedPlaylistSongs.some((song) => String(song.songID) === String(songID));

    const displayedMusics = playlistModeActive
        ? musics.filter((song) => isInPlaylist(song.songID))
        : musics;

    const handlePlaylistToggle = async (songID) => {
        if (!selectedPlaylistId) {
            setSidebarMessage("Válassz ki egy playlistet a jobb oldali sávban.");
            return;
        }

        try {
            if (isInPlaylist(songID)) {
                await removeSongFromPlaylist(selectedPlaylistId, songID);
                setSidebarMessage("Dalszám eltávolítva a playlistből.");
            } else {
                await addSongToPlaylist(selectedPlaylistId, songID);
                setSidebarMessage("Dalszám hozzáadva a playlisthez.");
            }
            await fetchPlaylistSongs(selectedPlaylistId);
        } catch (err) {
            console.error("Playlist művelet hiba:", err);
            setSidebarMessage("Hiba történt a playlist művelet közben.");
        }
    };

    const handleRemoveFromPlaylist = async (songID) => {
        if (!selectedPlaylistId) return;
        await removeSongFromPlaylist(selectedPlaylistId, songID);
        await fetchPlaylistSongs(selectedPlaylistId);
    };

    const handleSelectPlaylist = async (playlist) => {
        if (playlistModeActive) {
            stopPlaylist();
            setSidebarMessage("Aktív playlist leállítva a lista váltásához.");
        }
        setSelectedPlaylistId(playlist.playlistID);
        await fetchPlaylistSongs(playlist.playlistID, playlist.name);
    };

    const handleStartPlaylist = async () => {
        if (!selectedPlaylistId) {
            setSidebarMessage("Válassz listát a lejátszáshoz.");
            return;
        }
        if (selectedPlaylistSongs.length === 0) {
            setSidebarMessage("A kiválasztott playlist üres.");
            return;
        }

        const songIDs = selectedPlaylistSongs.map((song) => String(song.songID));
        const result = await startPlaylist(songIDs);
        if (result?.error) {
            setSidebarMessage(result.error);
            return;
        }

        setSidebarMessage("Playlist elindítva. Csak ennek a listának a dalai játszhatók.");
    };

    const handleStopPlaylist = () => {
        stopPlaylist();
        setSidebarMessage("Playlist leállítva.");
    };

    return (
        <div className="container-fluid px-4">
            {isLoggedIn ? (
                <div className="asd">
                    <div className="header">
                        <div className="logo">
                            OOOO<span className="focim_zold">DIFY</span>
                        </div>

                        <div className="header-buttons">
                            <Link to="/liked" className="header-btn">
                                Kedvencek
                            </Link>
                            <button className="header-btn" onClick={onLogout}>
                                Kijelentkezés
                            </button>
                            {isAdmin && (
                                <Link to="/admin" className="admin_panel">
                                    Admin panel
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="main-layout">
                        <div className="content-area">
                            <h2>Felkapott zenék</h2>
                            <p className="playlist-note">Jobb oldalon találod a playlistedet és több listát is létrehozhatsz.</p>
                            {playlistModeActive && selectedPlaylistSongs.length > 0 && (
                                <div className="playlist-active-banner">
                                    Csak a kiválasztott playlist dalai érhetők el.
                                </div>
                            )}
                            <div className="cards">
                                {displayedMusics.map((song) => (
                                    <Card
                                        key={song.songID}
                                        songObj={song}
                                        name={song.name}
                                        title={song.title}
                                        image={`http://127.0.0.1:4562${song.musicImg}`}
                                        song={`http://127.0.0.1:4562${song.song}`}
                                        isInPlaylist={isInPlaylist(song.songID)}
                                        onTogglePlaylist={handlePlaylistToggle}
                                    />
                                ))}
                            </div>
                        </div>

                        <aside className="playlist-sidebar">
                            <div className="playlist-sidebar-header">
                                <h3>Playlist menedzser</h3>
                                <p>Válassz listát, vagy hozz létre újat.</p>
                            </div>

                            <form className="playlist-create-form" onSubmit={handleCreatePlaylist}>
                                <input
                                    type="text"
                                    value={newPlaylistName}
                                    onChange={(e) => setNewPlaylistName(e.target.value)}
                                    placeholder="Új playlist neve"
                                />
                                <button type="submit">Létrehozás</button>
                            </form>

                            {sidebarMessage && <p className="sidebar-message">{sidebarMessage}</p>}

                            <div className="playlist-actions">
                                {playlistModeActive ? (
                                    <button type="button" className="playlist-start-btn stop" onClick={handleStopPlaylist}>
                                        Playlist leállítása
                                    </button>
                                ) : (
                                    <button type="button" className="playlist-start-btn" onClick={handleStartPlaylist}>
                                        Playlist elindítása
                                    </button>
                                )}
                            </div>

                            <div className="playlist-list">
                                <h4>Playlistjeid</h4>
                                {playlists.length === 0 ? (
                                    <p>Nem találtunk playlistet. Hozz létre egyet.</p>
                                ) : (
                                    <ul>
                                        {playlists.map((playlist) => (
                                            <li
                                                key={playlist.playlistID}
                                                className={playlist.playlistID === selectedPlaylistId ? 'selected' : ''}
                                                onClick={() => handleSelectPlaylist(playlist)}
                                            >
                                                {playlist.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="playlist-details">
                                <h4>{selectedPlaylistName || 'Nincs kiválasztott playlist'}</h4>
                                {playlistLoading ? (
                                    <p>Betöltés...</p>
                                ) : playlistError ? (
                                    <p className="error">{playlistError}</p>
                                ) : selectedPlaylistSongs.length === 0 ? (
                                    <p>A kiválasztott playlist üres.</p>
                                ) : (
                                    <ul className="playlist-song-list">
                                        {selectedPlaylistSongs.map((song) => (
                                            <li key={song.songID}>
                                                <div>
                                                    <strong>{song.name}</strong>
                                                    <p>{song.title}</p>
                                                </div>
                                                <button type="button" className="remove-btn" onClick={() => handleRemoveFromPlaylist(song.songID)}>
                                                    Törlés
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            ) : (
                <div className="home-wrapper">
                    <div className="header">
                        <div className="logo">
                            OOOO<span className="focim_zold">DIFY</span>
                        </div>

                        <div className="header-buttons">
                            <Link to="/login">
                                <button className="header-btn">Bejelentkezés</button>
                            </Link>
                        </div>
                    </div>

                    <div className="signup-banner">
                        <p>
                            <strong>
                                Belehallgatás az OOOO
                                <span className="focim_zold">DIFY</span>-ba
                            </strong>
                            <br />
                            Regisztrálj, és máris korlátlan hozzáférésed lesz
                        </p>

                        <Link to="/register">
                            <button>Ingyenes regisztráció</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}