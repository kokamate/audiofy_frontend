import { useNavigate } from "react-router-dom";
import '../css/Logged.css'
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
export default function Logged() {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://nodejs307.dszcbaross.edu.hu/user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Szerver hiba a kijelentkezéskor');
      }

      const data = await response.json();
      console.log(data);

      navigate('/home')

    } catch (error) {
      console.error('Hiba történt:', error);
      alert('Hiba a kijelentkezéskor!');
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div className="sidebar">
        <div className="menu">
          <a className="active"><i className="fa-solid fa-house"></i> Home</a>
          <a><i className="fa-solid fa-magnifying-glass"></i> Search</a>
          <a><i className="fa-solid fa-book"></i> Library</a>
        </div>

        {/* GYŰJTEMÉNYEM */}
        <div className="library-header">
          <h4>Gyűjteményem</h4>
          <button className="create-btn">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="library-card">
          <h5>Hozd létre az első műsorlistád!</h5>
          <p>Pofonegyszerű, ráadásul még segítünk is.</p>
          <button>Műsorlista létrehozása</button>
        </div>

        <div className="library-card">
          <h5>Keressünk pár podcastot!</h5>
          <p>Szólni fogunk, ha van új epizód.</p>
          <button>Podcastok böngészése</button>
        </div>

        <div className="sidebar-footer">
          <a>Jogi tudnivalók</a>
          <a>Adatvédelem</a>
          <a>Cookie-k</a>
          <button className="lang-btn">
            <i className="fa-solid fa-globe"></i> Magyar
          </button>
        </div>


      </div>
      <div className="header">
        <div className="logo">
          <i className="fa-brands fa-spotify"></i> OOOOudify
        </div>
        <div className="search">
          <input type="text" placeholder="Mit szeretnél hallgatni?" />
        </div>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="logout">Kijelentkezés</button>
      
        </form>
        
      </div>
      <div className="main">



        <h2>Felkapott dalok</h2>
        <div className="foresz">

          <div className="card">
            <div className="card-header">
              <div className="image-wrapper">
                <img src="https://picsum.photos/300?1" alt="borítókép" />
                <div className="play-button">▶</div>
              </div>
              <p className="song_name">Poker Face</p>
              <p className="song_artist">Stromae</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
