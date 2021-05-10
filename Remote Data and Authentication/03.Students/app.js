const tbodyElement = document.querySelector('tbody');
const formElement = document.getElementById('form');
let collection = [];

window.onload = function () {
    fetch('http://localhost:3030/jsonstore/collections/students')
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([id, student]) => {
                collection.push(student.firstName);
                collection.push(student.lastName);
                collection.push(student.facultyNumber);
                collection.push(student.grade);

                const tr = createEl('tr');
                const students = collection.forEach(s => {
                    const th = createEl('th', s)
                    tr.appendChild(th);
                });

                collection = [];
                tbodyElement.appendChild(tr);

            });
        })
}

function startApplication() {
    document.getElementById('submit').addEventListener('click', submitStudent);
}

startApplication()

async function submitStudent(event) {
    event.preventDefault();

    const formData = new FormData(formElement);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    collection.push(firstName);
    collection.push(lastName);
    collection.push(Number(facultyNumber));
    collection.push(Number(grade));

    const tr = createEl('tr');
    const students = collection.forEach(s => {
        const th = createEl('th', s)
        tr.appendChild(th);
    });

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return alert('All fields must be filled');
    } else {
        if (isNaN(grade) || isNaN(facultyNumber)) {
            alert('Grade and Faculty Number must be Number')
        } else {
            if (grade > 6 || grade < 2) {
                alert('The grade must be between 2 and 6')
            } else {
                document.querySelector('tbody').innerHTML = students;

                const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
                })

                if (response.ok == false) {
                    const error = await response.json();
                    return alert(error.message)
                }

                const data = await response.json();
            }
        }
    }

    collection = [];
    
}

function createEl(type, content, attributes = []) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (attributes) {
        attributes.map(a => a.split('='))
            .forEach(([name, value]) => element.setAttribute(name, value));
    }

    return element;
}
