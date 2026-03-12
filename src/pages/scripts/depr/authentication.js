function onLogin() {
    const username = document.getElementById("usernameInput").value
    const password = document.getElementById("passwordInput").value
    console.log(`Logging in as ${username}`);
    axios.post("/api/login", {
        username,
        password
    }).then(rsp => {
        console.log(`Logged in as ${username}!`, rsp.data)
        document.cookie = `token=${rsp.data.token}; Path=/`
        window.location.href = "/"
    }).catch(err => {
        if (err.response) {
            console.log(
                `Login failed with error code ${err.response.status}`,
                err.response.data
            );
            if (err.response.status === 401) {
                document.getElementById("errorHeaderA").style.visibility = "visible"
                document.getElementById("errorHeaderB").style.visibility = "visible"
            }
        }
    })
}

function onRegister() {
    const username = document.getElementById("usernameInput").value
    const password = document.getElementById("passwordInput").value
    console.log(`Registering ${username}`)
    axios.post("/api/register", {
        username: username,
        password: password
    }).then(rsp => {
        console.log(`Registered ${username}`, rsp.data)
        const errorHeaderA = document.getElementById("errorHeaderA")
        const errorHeaderB = document.getElementById("errorHeaderB")
        errorHeaderA.style.visibility = "visible"
        errorHeaderA.textContent = "Registeration Successful!"
    }).catch(err => {
        if (err.response) {
            console.log(`Registeration failed with error code ${err.response.status}`, err.response.data)
            const errorHeaderA = document.getElementById("errorHeaderA")
            const errorHeaderB = document.getElementById("errorHeaderB")
            errorHeaderA.style.visibility = "visible"
            errorHeaderB.style.visibility = "visible"
            if (err.response.status === 403) {
                errorHeaderA.textContent = "You are not an administrator."
                errorHeaderB.textContent = "You are not an administrator."
            }
        }
    })
}

function onLogout() {
    console.log(`Logged out !`)
    document.cookie = `token=...; Path=/`
    window.location.href = "/"
}

function getToken() {
    const match = document.cookie.match(/(^|;) ?token=([^;]*)/)
    return match ? match[2] : null
}
