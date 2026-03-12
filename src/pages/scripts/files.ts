// @ts-ignore
function megabytify(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(2)
}
// The files do not import eachother in their respective pages but typescript will always show duplicate functions

function getFiles() {
    const token = getToken()
    console.log("getting files..")
    axios.get("/api/files", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then((rsp: { data: any[] }) => {
        const wrapper = document.querySelector(".fileItemsWrapper")
        wrapper!.innerHTML = ""
        rsp.data.forEach((
            file: { 
                type: string, 
                url: string, 
                name: string,
                uploadedAt: string | number | Date,
                size: number
            }) => {
            const fileItem = document.createElement("div")
            fileItem.className = "fileItem"

            if (file.type === "image") {
                const img = document.createElement("img")
                img.src = file.url
                img.alt = file.name
                img.className = "fileImage"
                fileItem.appendChild(img)
            } else if (file.type === "video") {
                const video = document.createElement("video")
                video.src = file.url
                video.controls = true
                video.className = "videoEmbed"
                fileItem.appendChild(video)
            }
            else {
                const icon = document.createElement("div")
                icon.textContent = "📄"
                icon.className = "fileIcon"
                fileItem.appendChild(icon)
            }

            const info = document.createElement("div")
            info.className = "fileInfo"
            const uploadedTime = new Date(file.uploadedAt).toLocaleString()
            info.innerHTML = `<a href="/view/${encodeURIComponent(file.name)}" style="color: white; text-decoration: none;">${file.name}</a><br><small>${uploadedTime} (${megabytify(file.size)} MB)</small>`
            fileItem.appendChild(info)
            wrapper!.appendChild(fileItem)
        })
    })
    .catch((err: any) => console.error(err))
}

document.addEventListener("DOMContentLoaded", () => {
    getFiles()
})