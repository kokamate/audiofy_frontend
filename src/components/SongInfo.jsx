export default function SongInfo({ id, uploaderID, name, songDelete, onModify }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{uploaderID}</td>
            <td>
                <span className="song-name-badge">{name}</span>
            </td>
            <td>
                <button className="admin_confirm" onClick={() => songDelete(id)}>Törlés</button>
                <button className="edit-btn" onClick={onModify}>Szerkesztés</button>
            </td>
        </tr>
    )
}