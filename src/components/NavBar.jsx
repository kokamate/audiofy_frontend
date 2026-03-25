// NavBar.jsx
import { Link } from "react-router-dom";
import "../css/Home.css";
import { useState, useEffect } from "react";
import Card from "./Card";

export function NavBar({ user, onLogout }) {
    const [musics, setMusics] = useState([]);

    // Adatok lekérése a backendből
    useEffect(() => {
        async function fetchMusics() {
            try {
                const res = await fetch("http://127.0.0.1:4562/user/musics");
                const data = await res.json();
                console.log(data); // ← ide
                setMusics(data);
            } catch (err) {
                console.error("Hiba a zenék betöltésekor:", err);
            }
        }
        fetchMusics();
    }, []);

    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <div className="container-fluid px-4">
            {isLoggedIn ? (
                <div className="asd">
                    <div className="header">
                        <div className="logo">
                            OOOO<span className="focim_zold">DIFY</span>
                        </div>

                        <div className="header-buttons">
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

                    <div className="fooldalresz">
                        <h2>Felkapott zenék</h2>
                        <div className="cards">
                            {musics.map((song) => (
                                <Card
                                    key={song.songID}
                                    name={song.name}
                                    title={song.title}
                                    image={`http://127.0.0.1:4562/${song.musicImg}`}
                                    song= {`http://127.0.0.1:4562${song.song}`}
                                />
                            ))}
                        </div>
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