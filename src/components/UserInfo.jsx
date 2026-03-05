export default function UserInfo({ id, email, role, onDelete, onModify }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <button onClick={() => onDelete(id)} className="delete">Törlés</button>
                <button onClick={onModify} className="modify">Szerkesztés</button>
            </td>
        </tr>
    )
}