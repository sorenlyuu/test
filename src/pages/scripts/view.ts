// @ts-ignore
function megabytify(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(2)
}
// The files do not import eachother in their respective pages but typescript will always show duplicate functions

function viewFileInfo(file: string) {
    console.log(`[?] Viewing ${file}`)
    const token = getToken()
    axios.get(`/api/file/${file}`, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then((rsp: {
        data: {
            type: string,
            url: string,
            name: string,
            uploadedAt: string | number | Date,
            size: number
        }
    }) => {
        console.log(`[?] Recieved file info`, rsp.data)
        const fileInfo = rsp.data
        const container = document.querySelector(".fileInfoContainer")!
        if (fileInfo.type === "image") {
            const img = document.createElement("img")
            img.src = fileInfo.url
            img.alt = fileInfo.name
            img.className = "fileImage"
            container.insertBefore(img, container.children[0])
        } else if (fileInfo.type === "video") {
            const video = document.createElement("video")
            video.src = fileInfo.url
            video.controls = true
            video.className = "videoEmbed"
            container.insertBefore(video, container.children[0])
        } else {
            const icon = document.createElement("div")
            icon.textContent = "📄"
            icon.className = "fileIcon"
            container.insertBefore(icon, container.children[0])
        }
        const info = document.createElement("div")
        info.className = "fileInfo"
        const uploadedTime = new Date(fileInfo.uploadedAt).toLocaleString()
        info.innerHTML = `<a href="/files/${encodeURIComponent(fileInfo.name)}" style="color: white; text-decoration: none;">${fileInfo.name}</a><br><small>${uploadedTime} (${megabytify(fileInfo.size)} MB)</small>`
        container.insertBefore(info, container.children[1])
    }).catch((err: any) => console.error(err))
}

document.addEventListener("DOMContentLoaded", () => {
    viewFileInfo(document.URL.split("/").at(-1)!)
})

function catboxUploadRequest() {
    const file = document.URL.split("/").at(-1)!
    console.log(`[?] Uploading ${file}`)
    const token = getToken()
    const errorHeader = document.getElementById("errorHeader")!
    errorHeader.style.visibility = "visible"
    errorHeader.style.fontSize = "2.5rem"
    errorHeader.textContent = "Uploading..."
    axios.post(`/api/file/catbox`, { file }, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then((rsp: { data: any }) => {
        console.log(`[+] Uploaded to ${rsp.data}`)
        errorHeader.textContent = "Uploaded successfully! :3"
        setTimeout(() => {
            errorHeader.innerHTML = `<a href="${rsp.data}" style="color: white; text-decoration: none;">${rsp.data}</a>`
        }, 1000)
    }).catch((err: any) => {
        console.error("[!]", err)
        errorHeader.textContent = "Uploading failed... D:"
    })
}