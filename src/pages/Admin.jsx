import { useState, useEffect } from "react";
import '../css/Admin.css';
import UserInfo from '../components/UserInfo';
import SongInfo from "../components/SongInfo";
import { deleteuser, deletesongs } from "../api";

export default function Admin() {

    const [users, setUsers] = useState([]);
    const [musics, setMusics] = useState([]);

    // Üzenetek
    const [userHiba, setUserHiba] = useState('');
    const [userUzenet, setUserUzenet] = useState('');
    const [songHiba, setSongHiba] = useState('');
    const [songUzenet, setSongUzenet] = useState('');

    // Törlés modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [deleteID, setDeleteID] = useState(null);

    // Szerkesztés modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editSong, setEditSong] = useState(null);
    const [editEmail, setEditEmail] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editName, setEditName] = useState('');

    // --- Fetch users ---
    useEffect(() => {
        fetch("http://127.0.0.1:4562/admin/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    // --- Fetch musics ---
    useEffect(() => {
        fetch("http://127.0.0.1:4562/admin/musics")
            .then(res => res.json())
            .then(data => setMusics(data))
            .catch(err => console.error(err));
    }, []);

    // --- Törlés modal ---
    function openDeleteModal(type, id) {
        setDeleteType(type);
        setDeleteID(id);
        setShowDeleteModal(true);
    }
    function closeDeleteModal() { setShowDeleteModal(false); }

    async function confirmDelete() {
        if (deleteType === "user") await deleteUser(deleteID);
        if (deleteType === "song") await deleteSong(deleteID);
        setShowDeleteModal(false);
    }

    async function deleteUser(userID) {
        setUserUzenet(''); setUserHiba('');
        try {
            if (!users.find(u => u.userID === userID)) {
                setUserHiba("Ez a felhasználó már nem létezik!");
                return;
            }
            await deleteuser(userID);
            setUsers(users.filter(u => u.userID !== userID));
            setUserUzenet("Felhasználó törölve!");
        } catch (err) {
            console.error(err);
            setUserHiba("Hiba a törlés során!");
        }
    }

    async function deleteSong(songID) {
        setSongUzenet(''); setSongHiba('');
        try {
            if (!musics.find(m => m.songID === songID)) {
                setSongHiba("Ez a zene már nem létezik!");
                return;
            }
            await deletesongs(songID);
            setMusics(musics.filter(m => m.songID !== songID));
            setSongUzenet("Zene törölve!");
        } catch (err) {
            console.error(err);
            setSongHiba("Hiba a törlés során!");
        }
    }

    // --- Szerkesztés modal ---
    function openEditUserModal(user) {
        setEditUser(user);
        setEditEmail(user.email);
        setEditRole(user.role);
        setEditSong(null);
        setShowEditModal(true);
    }

    function openEditSongModal(song) {
        setEditSong(song);
        setEditName(song.name);
        setEditUser(null);
        setShowEditModal(true);
    }

    function closeEditModal() {
        setShowEditModal(false);
        setEditUser(null);
        setEditSong(null);
    }

    async function saveEditUser() {
        setUserUzenet(''); setUserHiba('');
        if (!editUser) return;

        const exists = users.find(u => u.userID === editUser.userID);
        if (!exists) {
            setUserHiba("Ez a felhasználó már nem létezik!");
            closeEditModal();
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:4562/admin/updateuser/${editUser.userID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: editEmail, role: editRole })
            });

            if (res.status === 404) {
                setUserHiba("Nem található a felhasználó!");
                closeEditModal();
                return;
            }

            setUsers(users.map(u => u.userID === editUser.userID ? { ...u, email: editEmail, role: editRole } : u));
            closeEditModal();
            setUserUzenet("Felhasználó frissítve!");
        } catch (err) {
            console.error(err);
            setUserHiba("Hiba a frissítés során!");
        }
    }

    async function saveEditSong() {
        setSongUzenet(''); setSongHiba('');
        if (!editSong) return;

        const exists = musics.find(m => m.songID === editSong.songID);
        if (!exists) {
            setSongHiba("Ez a zene már nem létezik!");
            closeEditModal();
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:4562/admin/updatesong/${editSong.songID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName })
            });

            if (res.status === 404) {
                setSongHiba("Nem található a zene!");
                closeEditModal();
                return;
            }

            setMusics(musics.map(m => m.songID === editSong.songID ? { ...m, name: editName } : m));
            closeEditModal();
            setSongUzenet("Zene frissítve!");
        } catch (err) {
            console.error(err);
            setSongHiba("Hiba a frissítés során!");
        }
    }

    const handleSave = () => {
        if (editUser) saveEditUser();
        if (editSong) saveEditSong();
    };

    return (
        <div className="admin-container">

            {/* Header */}
            <div className="admin_header">
                <div className="logo">OOOO<span className="focim_zold">DIFY</span></div>
                <div className="admin-title">ADMIN</div>
            </div>

            {/* Felhasználók */}
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
                                onDelete={() => openDeleteModal("user", user.userID)}
                                onEdit={() => openEditUserModal(user)}
                            />
                        ))}
                    </tbody>
                </table>
                {userUzenet && <div className="toast toast-success">{userUzenet}</div>}
                {userHiba && <div className="toast toast-error">{userHiba}</div>}
            </div>

            {/* Zenék */}
            <div className="section">
                <h2>Zenék Kezelése</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UploaderID</th>
                            <th>Név</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musics.map(song => (
                            <SongInfo
                                key={song.songID}
                                id={song.songID}
                                uploaderID={song.userID}
                                name={song.name}
                                songDelete={() => openDeleteModal("song", song.songID)}
                                onModify={() => openEditSongModal(song)}
                            />
                        ))}
                    </tbody>
                </table>
                {songUzenet && <div className="toast toast-success">{songUzenet}</div>}
                {songHiba && <div className="toast toast-error">{songHiba}</div>}
            </div>

            {/* Törlés modal */}
            {showDeleteModal && (
                <div className="admin_overlay">
                    <div className="admin_modal">
                        <h2>Biztosan törölni szeretnéd?</h2>
                        <p>Ez a művelet nem visszavonható.</p>
                        <div className="admin_buttons">
                            <button className="admin_cancel" onClick={closeDeleteModal}>Mégse</button>
                            <button className="admin_confirm" onClick={confirmDelete}>Törlés</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Szerkesztés modal */}
            {showEditModal && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        {editUser && <h2>Felhasználó szerkesztése</h2>}
                        {editSong && <h2>Zene szerkesztése</h2>}

                        {editUser && (
                            <>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                />
                                <label>Szerepkör</label>
                                <select value={editRole} onChange={e => setEditRole(e.target.value)}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </>
                        )}

                        {editSong && (
                            <>
                                <label>Név</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                />
                            </>
                        )}

                        <div className="edit-buttons">
                            <button className="cancel-btn" onClick={closeEditModal}>Mégse</button>
                            <button className="save-btn" onClick={handleSave}>Mentés</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}