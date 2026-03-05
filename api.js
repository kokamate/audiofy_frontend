import { data } from "react-router-dom"

const BACKEND_URL = 'http://localhost:4562/admin'

export async function deleteuser(userID) {
    //console.log(userID);
    const res = await fetch(`${BACKEND_URL}/deleteusers/${userID}`, {
        method: 'DELETE'
    })
}

export async function deletesongs(songID) {
    console.log(songID);
    const res = await fetch(`${BACKEND_URL}/deletesongs/${songID}`, {
        method: 'DELETE'
    })
}

//teszt