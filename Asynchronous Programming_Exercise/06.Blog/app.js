function attachEvents() {
    const postsBtn = document.getElementById('btnLoadPosts');
    const viewBtn = document.getElementById('btnViewPost');

    postsBtn.addEventListener('click', getPosts);
    viewBtn.addEventListener('click', displayPosts);
}

attachEvents();

async function getPosts() {
    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`
    const selectPosts = document.getElementById('posts');

    const responsePosts = await fetch(urlPosts);
    const dataPosts = await responsePosts.json();

    const optionsArr = Object.values(dataPosts)
        .map(p => {
            const option = document.createElement('option');
            option.textContent = p.title;
            option.value = p.id;

            return option;
        })
        .forEach(line => selectPosts.appendChild(line));

    
}

function displayPosts() {
    const postId = document.getElementById('posts').value;
    getComments(postId);
}

async function getComments(postId) {
    const urlComments = `http://localhost:3030/jsonstore/blog/comments/`
    const urlPostsId = `http://localhost:3030/jsonstore/blog/posts/${postId}`

    const responsePosts = await fetch(urlPostsId);
    const dataPosts = await responsePosts.json();

    const h1 = document.getElementById('post-title');
    h1.textContent = dataPosts.title;
    const ulPosts = document.getElementById('post-body');
    ulPosts.textContent = dataPosts.body;

    const responseComments = await fetch(urlComments);
    const dataComments = await responseComments.json();

    const filteredComments = Object.values(dataComments).filter(c => c.postId == postId);  

    const ulComments = document.getElementById('post-comments');
    
    filteredComments.map(c => {
        const li = document.createElement('li');
        li.textContent = c.text;
        li.id = c.id;

        return li;
    })
    .forEach(el => ulComments.appendChild(el));
}
