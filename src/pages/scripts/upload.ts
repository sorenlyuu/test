function onUpload() {
    const fileInput = document.getElementById("file") as HTMLInputElement
    if (!fileInput.files) {
        console.error(`[!] Files are empty`)
        alert("Something went wrong")
        return
    }
    const file = fileInput.files[0]
    if (!file) {
        console.error(`[!] No file input, ${fileInput.files}`)
        alert("Select a file first!")
        return
    }

    const formData = new FormData()
    formData.append("file", file)

    const token = getToken()

    axios.post("/api/upload", formData, {
        headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    }).then((rsp: { data: any }) => {
        console.log("Uploaded:", rsp.data)
        const errorHeader = document.getElementById("errorHeader")!
        errorHeader.style.visibility = "visible"
        errorHeader.textContent = "Uploaded! :3"
        getFiles()
    }).catch((err: any) => {
        console.error(err)
        const errorHeader = document.getElementById("errorHeader")!
        errorHeader.style.visibility = "visible"
        errorHeader.textContent = "Upload failed... T_T"
    })
}
