document.getElementById('loadBooks').addEventListener('click', getBooks);
document.getElementById('createForm').addEventListener('submit', createBook);
document.getElementById('updateForm').addEventListener('submit', updateBook);
document.querySelector('table').addEventListener('click', handleEditAndDeleteButtons);

getBooks();

async function getBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books')
    const data = await response.json();

    const bookLine = Object.entries(data).map(displayBook).join('')
    document.querySelector('tbody').innerHTML = bookLine;

    function displayBook([id, book]) {
        const result = `<tr data-id=${id}>\n<td>${book.title}</td>\n<td>${book.author}</td>\n<td>\n<button class="editBtn">Edit</button>\n<button class="deleteBtn">Delete</button>\n</td>\n</tr>`;
    
        return result;  
    }
}

async function createBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');

    if (author == '' || title == '') {
        return alert('All fields are required');
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title })
    })

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();

    event.target.reset();

    getBooks();
}

async function updateBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    if (author == '' || title == '') {
        return alert('All fields are required');
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title })
    })

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('updateForm').style.display = 'none';
    event.target.reset();

    getBooks();
}

async function deleteBook(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    })

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();

    getBooks();
}

function handleEditAndDeleteButtons(event) {
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('updateForm').style.display = 'block';
        const bookId = event.target.parentNode.parentNode.dataset.id;

        getBookForEdit(bookId);

    } else if (event.target.className == 'deleteBtn') {
        const bookId = event.target.parentNode.parentNode.dataset.id;

       deleteBook(bookId);
    }
}

async function getBookForEdit(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id)
    const data = await response.json();

    document.querySelector('#updateForm [name="id"]').value = id;
    document.querySelector('#updateForm [name="title"]').value = data.title;
    document.querySelector('#updateForm [name="author"]').value = data.author;
}