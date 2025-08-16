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
<script>
const API_LIST = "https://YOUR_API_GATEWAY_LIST_URL";  // replace with your API Gateway URL for list_expenses_lambda
const API_UPLOAD = "https://YOUR_API_GATEWAY_UPLOAD_URL";  // replace with your API Gateway URL for upload_expense_lambda

// Fetch existing files and show them
async function loadExpenses() {
  const response = await fetch(API_LIST);
  const data = await response.json();

  const list = document.getElementById("expenses-list");
  list.innerHTML = ""; // clear previous list

  data.forEach(file => {
    const li = document.createElement("li");
    li.textContent = file.FileName; // adjust based on your Lambda output
    list.appendChild(li);
  });
}

// Upload a new file
async function uploadExpense() {
  const fileInput = document.getElementById("upload-file");
  if (!fileInput.files.length) {
    alert("Select a file to upload!");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_UPLOAD, {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  alert(result.message || "Upload complete");

  // Refresh the file list
  loadExpenses();
}

// Load files on page load
window.onload = loadExpenses;
</script>
