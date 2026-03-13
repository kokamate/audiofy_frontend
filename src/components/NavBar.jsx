import { Link } from "react-router-dom"
import "../css/Home.css"
import Card from "./Card"

export function NavBar({ user, onLogout }) {

    const isLoggedIn = !!user
    const isAdmin = user?.role === "admin"

    return (
        <div className="container-fluid px-4">

            {isLoggedIn ? (



                <div className="asd">
                    <div className="header">
                        <div className="logo">
                            OOOO<span className="focim_zold">DIFY</span>
                        </div>

                        <div className="header-buttons">
                            <button
                                className="header-btn"
                                onClick={onLogout}
                            >
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
                            <Card
                                title='asdas'
                                artist='asd'
                            />
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
                                <button className="header-btn">
                                    Bejelentkezés
                                </button>
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
    )
}