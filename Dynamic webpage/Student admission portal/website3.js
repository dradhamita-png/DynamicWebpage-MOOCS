let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    if (!name || !age || !email || !course) {
        alert("Fill all fields");
        return;
    }

    students.push({ name, age, email, course });
    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added ✅");

    clearForm();
    renderTable();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    }
}

function editStudent(index) {
    const s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("email").value = s.email;
    document.getElementById("course").value = s.course;

    deleteStudent(index);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function renderTable() {
    const table = document.getElementById("table");
    const search = document.getElementById("search").value.toLowerCase();
    const filter = document.getElementById("filterCourse").value;

    table.innerHTML = "";

    let filtered = students.filter(s => {
        return (
            (s.name.toLowerCase().includes(search) ||
             s.email.toLowerCase().includes(search)) &&
            (filter === "" || s.course === filter)
        );
    });

    document.getElementById("count").textContent = filtered.length;

    filtered.forEach((s, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
            <td>
                <span class="action-btn" onclick="editStudent(${index})">✏️</span>
                <span class="action-btn" onclick="deleteStudent(${index})">🗑</span>
            </td>
        `;

        table.appendChild(row);
    });
}

renderTable();