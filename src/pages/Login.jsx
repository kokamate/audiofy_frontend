import { useState } from "react";
import '../css/Login.css'
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4562/user/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, psw }),
                credentials: 'include'
            });

            //console.log(response);
            const data = await response.json();

            if (response.ok) {
                setIsError(false);
                setMessage("Sikeres bejelentkezés!");

                setTimeout(() => {
                    navigate('/Logged');
                }, 1000);

            } else {
                setIsError(true);
                setMessage("E-mail cím vagy jelszó helytelen!");
            }

        } catch (error) {
            console.log(error);
            setIsError(true);
            setMessage("Szerver hiba történt");
        }
    };

    return (
        <>
            <div className="tarolo">
                <div className="focim">
                    <span className="focim_zold">OOOO</span>udify
                </div>

                <form onSubmit={handleSubmit}>
                    <p className="regEmail">E-mail-cím</p>
                    <div className="input">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nev@domain.com" />
                    </div>


                    <p className="regEmail2">Jelszó</p>
                    <div className="input">
                        <input
                            type="password"
                            value={psw}
                            onChange={(e) => setPsw(e.target.value)}
                            required
                        />
                    </div>
                    <div className="reg">
                        <button type="submit">Bejelentkezés</button>
                    </div>

                    {message && (
                        <p className={isError ? "formMessage error" : "formMessage success"}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </>
    )
}