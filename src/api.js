const ADMIN_URL = 'http://localhost:4562/admin';
const BACKEND_URL = 'http://localhost:4562/user';
const IMAGE_URL = 'http://localhost:4562/song-images'

export async function getSongImg(song_id) {
    try {
        const res = await fetch(`${IMAGE_URL}/${song_id}`)
        if (!res.ok) {
            console.error('Hiba a kép lekérésekor:', res.status)
            return null
        }
        const data = await res.json()
        console.log('Lekért kép adatok:', data)
        return data
    } catch (err) {
        console.error('Hálózati hiba:', err)
        return null
    }
}


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

export async function getLikedSongs() {
    const res = await fetch(`${BACKEND_URL}/liked-songs`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function toggleLikeSong(songID) {
    console.log("Toggling like for songID:", songID);
    const res = await fetch(`${BACKEND_URL}/like/${songID}`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Like toggle error:", data?.error);
        return { error: data?.error };
    }

    console.log("Like toggle response:", data);
    return data;
}

export async function getPlaylists() {
    const res = await fetch(`${BACKEND_URL}/playlists`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function createPlaylist(name) {
    const res = await fetch(`${BACKEND_URL}/playlists`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function getPlaylistSongs(playlistID) {
    const res = await fetch(`${BACKEND_URL}/playlists/${playlistID}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function getPlaylist() {
    const playlists = await getPlaylists();
    if (playlists?.error) {
        return playlists;
    }
    if (!Array.isArray(playlists) || playlists.length === 0) {
        return [];
    }
    return await getPlaylistSongs(playlists[0].playlistID);
}

export async function addSongToPlaylist(playlistID, songID) {
    const res = await fetch(`${BACKEND_URL}/playlists/${playlistID}/songs/${songID}`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function removeSongFromPlaylist(playlistID, songID) {
    const res = await fetch(`${BACKEND_URL}/playlists/${playlistID}/songs/${songID}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

