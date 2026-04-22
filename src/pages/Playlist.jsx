import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { getPlaylists, getPlaylistSongs, removeSongFromPlaylist } from "../api";
import "../css/Home.css";

export default function Playlist() {
    const [playlist, setPlaylist] = useState([]);
    const [playlistId, setPlaylistId] = useState(null);
    const [playlistName, setPlaylistName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function initPlaylist() {
            setLoading(true);
            setError("");
            try {
                const playlists = await getPlaylists();
                if (playlists?.error) {
                    setError(playlists.error);
                    setPlaylist([]);
                    return;
                }
                if (!playlists.length) {
                    setPlaylist([]);
                    return;
                }
                const firstPlaylist = playlists[0];
                setPlaylistId(firstPlaylist.playlistID);
                setPlaylistName(firstPlaylist.name);
                const data = await getPlaylistSongs(firstPlaylist.playlistID);
                if (data?.error) {
                    setError(data.error);
                    setPlaylist([]);
                } else {
                    setPlaylist(data);
                }
            } catch (err) {
                console.error("Playlist lekérése hiba:", err);
                setError("Hiba a playlist betöltésekor.");
            } finally {
                setLoading(false);
            }
        }

        initPlaylist();
    }, []);

    const handleRemove = async (songID) => {
        if (!playlistId) return;
        await removeSongFromPlaylist(playlistId, songID);
        const data = await getPlaylistSongs(playlistId);
        if (data?.error) {
            setError(data.error);
            setPlaylist([]);
        } else {
            setPlaylist(data);
        }
    };

    return (
        <div className="container-fluid px-4">
            <div className="asd">
                <div className="header">
                    <Link to="/" className="admin_link_hehe">
                        <div className="logo">OOOO<span className="focim_zold">DIFY</span></div>
                    </Link>
                </div>

                <div className="fooldalresz">
                    <h2>Lejátszási lista</h2>
                    {loading ? (
                        <p>Betöltés...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : playlist.length === 0 ? (
                        <p>A lejátszási listád üres.</p>
                    ) : (
                        <div className="cards">
                            {playlist.map((song) => (
                                <Card
                                    key={song.songID}
                                    songObj={song}
                                    name={song.name}
                                    title={song.title}
                                    image={`https://nodejs307.dszcbaross.edu.hu${song.musicImg}`}
                                    song={`https://nodejs307.dszcbaross.edu.hu${song.song}`}
                                    isInPlaylist={true}
                                    onTogglePlaylist={handleRemove}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}