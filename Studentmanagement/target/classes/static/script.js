// ================= AUTH CHECK =================

// If not logged in → redirect
if (!localStorage.getItem("token")) {
    window.location = "login.html";
}


// ================= GLOBAL =================

let students = [];
let currentPage = 1;
const perPage = 6;

const API_URL = "http://localhost:8080/api/students";


// Get Token
function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}



// ================= LOAD =================

window.onload = function () {
    loadStudents();
};


function loadStudents() {

    fetch(API_URL, {
        headers: getAuthHeaders()
    })
        .then(res => {

            if (res.status === 401) {
                logout();
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to load students");
            }

            return res.json();
        })
        .then(data => {

            students = data;
            currentPage = 1;
            render();

        })
        .catch(err => console.error("API Error:", err));
}



// ================= RENDER =================

function render() {

    const search = document
        .getElementById("searchBox")
        .value
        .toLowerCase();


    let filtered = students.filter(s => {

        let courses = s.courses ? s.courses.join(", ") : "";

        return (
            s.name.toLowerCase().includes(search) ||
            s.email.toLowerCase().includes(search) ||
            courses.toLowerCase().includes(search)
        );

    });


    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    displayStudents(filtered.slice(start, end));

    document.getElementById("pageNum").innerText = currentPage;
}



// ================= DISPLAY =================

function displayStudents(list) {

    const tbody = document.getElementById("studentTable");

    if (!tbody) {
        console.error("studentTable not found!");
        return;
    }


    tbody.innerHTML = "";


    if (list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No Students Found
                </td>
            </tr>
        `;
        return;
    }


    list.forEach(s => {

        let courses = s.courses ? s.courses.join(", ") : "-";


        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${courses}</td>

            <td>
                <button class="edit"
                    onclick="editStudent(${s.id})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteStudent(${s.id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });

}



// ================= SEARCH =================

function searchStudents() {

    currentPage = 1;
    render();

}



// ================= PAGINATION =================

function nextPage() {

    const maxPage = Math.ceil(students.length / perPage);

    if (currentPage < maxPage) {
        currentPage++;
        render();
    }

}


function prevPage() {

    if (currentPage > 1) {
        currentPage--;
        render();
    }

}



// ================= MODAL =================

function openModal() {

    document.getElementById("studentModal").style.display = "flex";

    document.getElementById("modalTitle").innerText = "Add Student";

    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";

}


function closeModal() {

    document.getElementById("studentModal").style.display = "none";

}



// ================= SAVE =================

function saveStudent() {

    const id = document.getElementById("studentId").value.trim();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();


    const coursesArr = document
        .getElementById("course")
        .value
        .split(",")
        .map(c => c.trim())
        .filter(c => c !== "");


    if (!name || !email) {
        alert("Name and Email required!");
        return;
    }


    const student = {
        name,
        email,
        courses: coursesArr
    };


    let url = API_URL;
    let method = "POST";


    if (id) {
        url += "/" + id;
        method = "PUT";
    }


    fetch(url, {

        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(student)

    })
        .then(res => {

            if (res.status === 401) {
                logout();
                return;
            }

            if (!res.ok) {
                throw new Error("Save failed");
            }

            return res.json();

        })
        .then(() => {

            closeModal();
            loadStudents();

        })
        .catch(err => {

            console.error("Save Error:", err);
            alert("Save failed!");

        });

}



// ================= EDIT =================

function editStudent(id) {

    const s = students.find(x => x.id === id);

    if (!s) return;


    openModal();

    document.getElementById("modalTitle").innerText = "Edit Student";

    document.getElementById("studentId").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;

    document.getElementById("course").value =
        s.courses ? s.courses.join(", ") : "";

}



// ================= DELETE =================

function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;


    fetch(`${API_URL}/${id}`, {

        method: "DELETE",
        headers: getAuthHeaders()

    })
        .then(res => {

            if (res.status === 401) {
                logout();
                return;
            }

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            loadStudents();

        })
        .catch(err => {

            console.error("Delete Error:", err);
            alert("Delete failed!");

        });

}



// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");

    window.location = "login.html";

}
