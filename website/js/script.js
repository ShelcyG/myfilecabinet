const folders = {
    bills: ["bank_bill.pdf", "phone_bill.pdf", "water_bill.pdf"],
    personal: ["certificate.pdf", "transcript.pdf", "id_card.pdf"],
    lia: ["resume.pdf", "cover_letter.docx", "profile_photo.jpg"],
    irene: ["project_report.pdf", "budget.xlsx", "notes.txt"]
};

function showFiles(folderName) {
    document.getElementById("folderView").style.display = "none";
    document.getElementById("fileView").style.display = "block";
    document.getElementById("folderTitle").textContent = folderName.charAt(0).toUpperCase() + folderName.slice(1);

    const fileDiv = document.getElementById("fileList");
    fileDiv.innerHTML = folders[folderName]
        .map(file => `<p>${file} 
            <button onclick="alert('Viewing ${file}')">View</button> 
            <button onclick="alert('Downloading ${file}')">Download</button>
        </p>`).join("");
}

function goBack() {
    document.getElementById("folderView").style.display = "block";
    document.getElementById("fileView").style.display = "none";
}

function openUploadModal() {
    document.getElementById("uploadModal").style.display = "block";
}

function closeUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
}

// Optional: Drag & Drop upload (placeholder)
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal-content");
    modal.addEventListener("dragover", e => {
        e.preventDefault();
        modal.style.background = "#e0ffe0";
    });
    modal.addEventListener("dragleave", () => {
        modal.style.background = "white";
    });
    modal.addEventListener("drop", e => {
        e.preventDefault();
        alert("Files dropped (placeholder)");
        modal.style.background = "white";
    });
});
