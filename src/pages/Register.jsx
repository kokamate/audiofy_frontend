import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4562/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          psw,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Hiba történt a regisztráció során");
        return;
      }
      setIsError(false);
      setMessage("Sikeres regisztráció!");
      // Átirányítás login oldalra
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Hiba:", error);
      setIsError(true);
      setMessage("Szerver hiba történt");
    }
  };

  return (
    <div className="tarolo">

      <h1 className="focim">
        OOO<span className="focim_zold">udify</span>
      </h1>

      <div className="regText">Regisztrálj a zenehallgatás elindításához</div>

      <form onSubmit={handleSubmit}>

        <div className="regEmail">Email cím</div>
        <div className="input">
          <input
            type="email"
            placeholder="nev@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="regPassword">Jelszó</div>
        <div className="input">
          <input
            type="password"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            required
          />
        </div>

        <div className="reg">
          <button type="submit">Regisztráció</button>
        </div>

        {message && (
          <p className={isError ? "formMessage error" : "formMessage success"}>
            {message}
          </p>
        )}

      </form>

      <div className="loginContainer">
        <p className="loginText">
          Már van fiókod?
        </p>
        <a href="/login" className="loginLink">Bejelentkezés</a>
      </div>

    </div>
  );
}

export default Register;
