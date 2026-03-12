function getFiles() {
    const token = getToken()
    console.log("getting files..")
    axios.get("/api/files", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(rsp => {
        const wrapper = document.querySelector(".fileItemsWrapper")
        wrapper.innerHTML = "" // Clear previous items

        rsp.data.forEach(file => {
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
            info.innerHTML = `<a href=/view/${encodeURIComponent(file.name)} style="text-decoration: none; color: white;">${file.name}</a><br><small>${uploadedTime}</small>`
            fileItem.appendChild(info)
            wrapper.appendChild(fileItem)
        })
    })
    .catch(err => console.error(err))
}

document.addEventListener("DOMContentLoaded", () => {
    getFiles()
})