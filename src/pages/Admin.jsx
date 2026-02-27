import { useState, useEffect } from "react"
import '../css/Admin.css'
import UserInfo from '../components/UserInfo'

export default function Admin() {
    const[users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:4562/admin/users") // API endpoint
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err))
    }, [])

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
                                key={user.id}
                                id={user.id}
                                email={user.email}
                                role={user.role}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

