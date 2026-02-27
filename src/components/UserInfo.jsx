export default function UserInfo({ id, email, role }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>{role}</td>
        </tr>
    )
}