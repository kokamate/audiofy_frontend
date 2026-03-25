import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import { whoami, logout } from "../api"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export default function Home() {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const navigate = useNavigate();

    //console.log(errorUser)
    //console.log(user);

    useEffect(() => {
        async function load() {
            const data = await whoami()
            console.log(data);
            if (data.error) {
                return setErrorUser(data.error)
            }
            return setUser(data)
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        console.log(data);
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }
    return (
        <div>
            <NavBar user={user} onLogout={onLogout} />
        </div>
    )
}