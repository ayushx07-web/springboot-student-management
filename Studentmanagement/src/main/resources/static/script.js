const API = "http://localhost:8080/api/students";

let editId = null;

// Load students when page opens
loadStudents();

// ================= LOAD =================
function loadStudents() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.forEach(s => {

                rows += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>
                        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', '${s.course}')">
                            Edit
                        </button>

                        <button class="delete" onclick="deleteStudent(${s.id})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            });

            document.getElementById("studentTable").innerHTML = rows;
        });
}

// ================= ADD / UPDATE =================
function addStudent() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value.trim();

    // Validation
    if (name === "" || email === "" || course === "") {
        alert("All fields are required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter valid email!");
        return;
    }

    let student = { name, email, course };

    let method = "POST";
    let url = API;

    // If editing -> UPDATE
    if (editId !== null) {
        method = "PUT";
        url = API + "/" + editId;
    }

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(() => {

        loadStudents();
        clearForm();

        // Reset edit mode
        editId = null;
    });
}

// ================= DELETE =================
function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete?")) {
        return;
    }

    fetch(API + "/" + id, {
        method: "DELETE"
    })
    .then(() => loadStudents());
}

// ================= EDIT =================
function editStudent(id, name, email, course) {

    editId = id;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("course").value = course;
}

// ================= CLEAR =================
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

function searchStudent() {

    let keyword = document.getElementById("search").value.trim();

    if (keyword === "") {
        loadStudents();
        return;
    }

    fetch(API + "/search?name=" + keyword)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.forEach(s => {

                rows += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>
                        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', '${s.course}')">
                            Edit
                        </button>

                        <button class="delete" onclick="deleteStudent(${s.id})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            });

            document.getElementById("studentTable").innerHTML = rows;
        });
}

