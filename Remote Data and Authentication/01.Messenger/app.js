function attachEvents() {
    document.getElementById('submit').addEventListener('click', async () => {
        const author = document.querySelector('input[name="author"]').value;
        const content = document.querySelector('input[name="content"]').value;

        await onSend({ author, content })

        document.querySelector('input[name="author"]').value = '';
        document.querySelector('input[name="content"]').value = '';

    });

    document.getElementById('refresh').addEventListener('click', getMessages);

}

attachEvents();

async function getMessages() {
    const response = await fetch('http://localhost:3030/jsonstore/messenger')
    const data = await response.json();

    const messages = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n');

    document.getElementById('messages').value = messages;
}


async function onSend(message) {

    const response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    })

    const data = await response.json()

}
