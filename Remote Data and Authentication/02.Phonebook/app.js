function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', displayPhonebook);
    document.getElementById('btnCreate').addEventListener('click', createContact);
    document.getElementById('phonebook').addEventListener('click', handleDeleteBtn);

    displayPhonebook()
}

attachEvents();

async function displayPhonebook() {
    const url = document.getElementById('phonebook');

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    const contacts = Object.entries(data).map(displayContact).join('\n');
    

    function displayContact([key, contact]) {
        const ul = document.getElementById('phonebook');

        const li = document.createElement('li');
        li.setAttribute('data-id', `${key}`);
        li.textContent = `${contact.person}: ${contact.phone}`
        const btn = document.createElement('button');
        btn.setAttribute('class', 'deleteBtn');
        btn.textContent = 'Delete';

        li.appendChild(btn);
        ul.appendChild(li);
    }


}

async function createContact(event) {

    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person, phone })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();
}

async function deleteContact(key) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + key, {
        method: 'delete',
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();

}

function handleDeleteBtn(event) {
    if (event.target.className == 'deleteBtn') {
        const contactKey = event.target.parentNode.dataset.id;

        deleteContact(contactKey);
    }
}