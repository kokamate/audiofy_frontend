export default function SongInfo({ id, uploaderID, name, songDelete, onModify }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{uploaderID}</td>
            <td>{name}</td>
            <td>
                <button onClick={() => songDelete(id)} className="delete">Törlés</button>
                <button onClick={onModify} className="modify">Szerkesztés</button>
            </td>
        </tr>
    )
}