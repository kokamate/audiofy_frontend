import { useState, useEffect } from "react"
import '../css/Admin.css'
import UserInfo from '../components/UserInfo'
import SongInfo from "../components/SongInfo"

import { deleteuser, deletesongs } from "../../api"

export default function Admin() {
    const [users, setUsers] = useState([])
    const [musics, setMusics] = useState([])
    const [userhiba, setUserHiba] = useState('')
    const [useruzenet, setUserUzenet] = useState('')
    const [songhiba, setSongHiba] = useState('')
    const [songuzenet, setSongUzenet] = useState('')

    useEffect(() => {
        fetch("http://127.0.0.1:4562/admin/users") // API endpoint
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err))


    }, [])


    useEffect(() => {
        fetch("http://127.0.0.1:4562/admin/musics") // API endpoint
            .then(res => res.json())
            .then(data => setMusics(data))
            .catch(err => console.error(err))


    }, [])



    async function onDelete(userID) {
        setUserUzenet('')
        setUserHiba('')

        try {
            await deleteuser(userID)
            setUsers(users.filter(user => user.userID !== userID))
            setUserUzenet("Felhasználó törölve!")
        } catch (err) {
            console.log(err);
            setUserHiba("Hiba a törlés során!")
        }
    }

    async function songDelete(songID) {
        setSongUzenet('')
        setSongHiba('')

        try {
            await deletesongs(songID)
            setMusics(musics.filter(music => music.songID !== songID))
            setSongUzenet("Zene törölve!")
        } catch (err) {
            console.log(err);
            setSongHiba("Hiba a törlés során!")
        }
    }

    return (
        <div className="admin-container">

            <div className="header">
                <div className="logo">OOOOudify</div>
                <div className="admin-title">ADMIN</div>
            </div>



            <div className="section">
                <h2>Felhasználók Kezelése</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>E-mail</th>
                            <th>Szerepkör</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserInfo
                                key={user.userID}
                                id={user.userID}
                                email={user.email}
                                role={user.role}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {userhiba && <div className="hiba">{userhiba}</div>}
            {useruzenet && <div className="uzenet">{useruzenet}</div>}

            <div className="section">
                <h2>Zenék Kezelése</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>uploaderID</th>
                            <th>Név</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musics.map(music => (
                            <SongInfo
                                key={music.songID}
                                id={music.songID}
                                uploaderID={music.userID}
                                name={music.name}
                                songDelete={songDelete}
                            />
                        ))}
                    </tbody>
                </table>

                {songhiba && <div className="hiba">{songhiba}</div>}
                {songuzenet && <div className="uzenet">{songuzenet}</div>}
            </div>

        </div>
    )
}

