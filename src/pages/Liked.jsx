import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import Card from "../components/Card";
import "../css/Home.css";

export default function Liked() {
    const { likedSongs } = useMusic();
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMusics() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("https://nodejs307.dszcbaross.edu.hu/user/musics");
                const data = await res.json();
                setMusics(data || []);
            } catch (err) {
                console.error("Hiba a zenék betöltésekor:", err);
                setError("Hiba a zenék betöltésekor.");
            } finally {
                setLoading(false);
            }
        }

        fetchMusics();
    }, []);

    const likedMusics = musics.filter((song) => likedSongs.includes(String(song.songID)));

    return (
        <div className="container-fluid px-4">
            <div className="asd">
                <div className="header">
                    <Link to="/" className="admin_link_hehe">
                        <div className="logo">OOOO<span className="focim_zold">DIFY</span></div>
                    </Link>
                    <div className="header-buttons">
                        <Link to="/" className="header-btn">
                            Vissza a főoldalra
                        </Link>
                    </div>
                </div>
                <div className="fentvan">

                    <div className="fooldalresz">
                        <h2>Kedvencek</h2>
                        {loading ? (
                            <p>Betöltés...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : likedMusics.length === 0 ? (
                            <p>Még nincs kedvenc dalod.</p>
                        ) : (

                            <div className="cards">
                                {likedMusics.map((song) => (
                                    <Card
                                        key={song.songID}
                                        songObj={song}
                                        name={song.name}
                                        title={song.title}
                                        image={`https://nodejs307.dszcbaross.edu.hu${song.musicImg}`}
                                        song={`https://nodejs307.dszcbaross.edu.hu${song.song}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
