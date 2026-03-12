declare const axios: any

function onLogin() {
    const username = (document.getElementById("usernameInput") as HTMLInputElement).value
    const password = (document.getElementById("passwordInput") as HTMLInputElement).value
    console.log(`[+] Logging in as ${username}`);
    axios.post("/api/login", {
        username,
        password
    }).then((rsp: { data: { token: any } }) => {
        console.log(`Logged in as ${username}!`, rsp.data)
        document.cookie = `token=${rsp.data.token}; Path=/`
        window.location.href = "/"
    }).catch((err: { response: { status: number, data: any } }) => {
        if (err.response) {
            console.log(
                `Login failed with error code ${err.response.status}`,
                err.response.data
            );
            if (err.response.status === 401) {
                document.getElementById("errorHeaderA")!.style.visibility = "visible"
                document.getElementById("errorHeaderB")!.style.visibility = "visible"
            }
        }
    })
}

function onRegister() {
    const username = (document.getElementById("usernameInput") as HTMLInputElement).value
    const password = (document.getElementById("passwordInput") as HTMLInputElement).value
    console.log(`[+] Registering ${username}`);
    axios.post("/api/register", {
        username,
        password
    }).then((rsp: {data: any}) => {
        console.log(`Registered ${username}!`, rsp.data)
        document.getElementById("errorHeaderA")!.textContent = `Registered ${username}~`
        document.getElementById("errorHeaderA")!.style.visibility = "visible"
    }).catch((err: { response: { status: number, data: any } }) => {
        if (err.response) {
            console.log(
                `Registeration failed with error code ${err.response.status}`,
                err.response.data
            )
            if (err.response.status === 403) {
                document.getElementById("errorHeaderA")!.textContent = "You are not an administrator!"
                document.getElementById("errorHeaderA")!.style.visibility = "visible"
            }
        }
    })
}

function onLogout() {
    console.log(`[+] Logged out !`)
    document.cookie = `token=...; Path=/`
    window.location.href = "/"
}

function getToken() {
    const match = document.cookie.match(/(^|;) ?token=([^;]*)/)
    return match ? match[2] : null
}