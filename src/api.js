const ADMIN_URL = 'http://localhost:4562/admin'
const BACKEND_URL = "/user";

// REGISTER
export async function register(email, psw) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, psw }),
    });

    const data = await res.json();
    return data;
}

// LOGIN
export async function login(email, psw) {
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, psw }),
    });

    const data = await res.json();
    return data;
}

// WHO AM I (session check)
export async function whoami() {
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

// LOGOUT
export async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function deleteuser(userID) {
    //console.log(userID);
    const res = await fetch(`${ADMIN_URL}/deleteusers/${userID}`, {
        method: 'DELETE'
    })
}

export async function deletesongs(songID) {
    console.log(songID);
    const res = await fetch(`${ADMIN_URL}/deletesongs/${songID}`, {
        method: 'DELETE'
    })
}

