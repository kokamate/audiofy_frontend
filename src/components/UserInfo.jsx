export default function UserInfo({ id, email, role, onDelete, onEdit }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>
                <span className={`role-badge role-${role}`}>{role}</span>
            </td>
            <td>
                <button className="admin_confirm" onClick={() => onDelete(id)}>Törlés</button>
                <button className="edit-btn" onClick={onEdit}>Szerkesztés</button>
            </td>
        </tr>
    );
}