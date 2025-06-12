function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function donorPostRegister(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donorregister", {method: "POST", headers: {
        "Content-type" : "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    if(!res.ok) {
        throw { 
            message: data.msg,
            status: res.status
        }
    }
    return data
}

export async function donorPostLogin(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donorlogin", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    const username = data.username
    sessionStorage.setItem("username", username)
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return username
}

export async function donorGetCreds(username) {
    const res = await fetch(`http://localhost:3000/donorlogin/${username}`)
    const data = await res.json()
    const user = data.user
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return user
}


export async function bloodDonate(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donate", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
}

export async function donorGetDonations(username) {
    const res = await fetch(`http://localhost:3000/donate/${username}`)
    const data = await res.json()
    const donation = data
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return donation
}


export async function updateDonorProfile(cred) {
    await sleep(1000)
    const res = await fetch(`http://localhost:3000/donorregister/${cred.id}`, {method: "PATCH", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(cred)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data.msg
}


export async function verifyDonorsAnswer(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donorregister/:id/verify-answer", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data
}

export async function verifyDonorsUsername(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donorregister/:id/verify-username", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data
}


export async function changeDonorsPassword(creds) {
    await sleep(1000)
    const res = await fetch("http://localhost:3000/donorregister/:id/reset", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(creds)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
}

export async function getPendingDonationCount(username) {
    const res = await fetch(`http://localhost:3000/pending-user-donations?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getAcceptedDonationCount(username) {
    const res = await fetch(`http://localhost:3000/accepted-user-donations?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getRejectedDonationCount(username) {
    const res = await fetch(`http://localhost:3000/rejected-user-donations?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getLastDonation(username) {
    const res = await fetch(`http://localhost:3000/donate/${username}/last`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data;
}