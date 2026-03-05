import { useNavigate } from "react-router-dom";
import '../css/Home.css';

export default function Home() {

  const navigate = useNavigate();

  return (
      <div className="content">
        <div className="home-wrapper">

          <div className="header">
            <div className="logo">OOOOudify</div>

            <div className="header-buttons">
              <button className="reg" onClick={() => navigate("/login")}>
                Bejelentkezés
              </button>
              <button className="reg" onClick={() => navigate("/register")}>
                Regisztráció
              </button>
            </div>
          </div>

          <div className="section">
            {/* Fő tartalom */}
          </div>

          <div className="signup-banner">
            <p>
              <strong>Belehallgatás az OOOOudify-ba</strong><br />
              Regisztrálj, és máris korlátlan hozzáférésed lesz.
            </p>
            <button onClick={() => navigate("/register")}>Ingyenes regisztráció</button>
          </div>

        </div>
    </div>
  );
}