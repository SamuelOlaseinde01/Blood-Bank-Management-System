function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}  

export async function getAllDonations() {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/donate/all`)
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

export async function getAllRequests() {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/request/all`)
    const data = await res.json()
    const requests = data
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return requests
}

export async function updateRequestStatus({ rId, rStatus }) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/request/all/${rId}`, {method: "PATCH", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify({status: rStatus})})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.error,
            status: res.status
        }
    }
    return data.message
}

export async function updateDonationStatus({ rId, rStatus }) {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/donate/all/${rId}`, {method: "PATCH", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify({status: rStatus})})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data.message
}

export async function getAllDonors() {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/donorregister/all`)
    const data = await res.json()
    const donors = data
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return donors
}

export async function getAllRecipients() {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/recipientregister/all`)
    const data = await res.json()
    const donors = data
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return donors
}

export async function getBloodTypes() {
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/bloodTypes`)
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.msg,
            status: res.status
        }
    }
    return data
}

export async function addBloodStock(cred) {
    await sleep(1000)
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/bloodTypes/add`, {method: "PATCH", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(cred)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.error,
            status: res.status
        }
    }
    return data.message
}

export async function removeBloodStock(cred) {
    await sleep(1000)
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/bloodTypes/remove`, {method: "PATCH", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(cred)})
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.error,
            status: res.status
        }
    }
    return data.message
}

export async function adminLogin(cred) {
    await sleep(1000)
    const res = await fetch(`https://blood-bank-management-system-0zdu.onrender.com/adminlogin`, {method: "POST", headers: {
        "Content-type": "application/json"
    }, body: JSON.stringify(cred)})
    const data = await res.json()
    const isLoggedIn = data.success
    sessionStorage.setItem("isLoggedIn", isLoggedIn)
    if(!res.ok) {
        throw {
            message: data.message,
            status: res.status
        }
    }
    return data
}

export async function getPendingRequests() {
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/pending-requests")
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.message,
            status: res.status
        }
    }
    return data.count
}

export async function getPendingDonations() {
    const res = await fetch("https://blood-bank-management-system-0zdu.onrender.com/pending-donations")
    const data = await res.json()
    if(!res.ok) {
        throw {
            message: data.message,
            status: res.status
        }
    }
    return data.count
}
