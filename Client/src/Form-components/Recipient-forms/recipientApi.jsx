function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function recipientPostRegister(cred) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/recipientregister", {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(cred)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data
}

export async function recipientPostLogin(creds) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/recipientlogin", {method: "POST", headers: {
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

export async function recipientGetCreds(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/recipientlogin/${username}`)
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

export async function bloodRequest(creds) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/request", {method: "POST", headers: {
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

export async function recipientGetRequests(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/request/${username}`)
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

export async function updateRecipientProfile(cred) {
    await sleep(1000)
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/recipientregister/${cred.id}`, {method: "PATCH", headers: {
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

export async function verifyRecipientsAnswer(creds) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/recipientregister/:id/verify-answer", {method: "POST", headers: {
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

export async function verifyRecipientsUsername(creds) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/recipientregister/:id/verify-username", {method: "POST", headers: {
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

export async function changeRecipientsPassword(creds) {
    await sleep(1000)
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/recipientregister/:id/reset", {method: "POST", headers: {
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

export async function getPendingRequestCount(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/pending-user-requests?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getAcceptedRequestCount(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/accepted-user-requests?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getRejectedRequestCount(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/rejected-user-requests?username=${username}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data.count;
}

export async function getLastRequest(username) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/request/${username}/last`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch count");
    }

    return data;
}