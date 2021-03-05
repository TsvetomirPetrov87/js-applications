function solution() {

    getArticles()
}

async function getArticles() {
    const section = document.getElementById('main');

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const response = await fetch(url);
    const dataArticles = await response.json();

    dataArticles.forEach(a => {
        const accorionDiv = createEl('div', '', ['class=accordion']);
        const headDiv = createEl('div', '', ['class=head']);
        const span = createEl('span', a.title)
        const button = createEl('button', 'More', ['class=button', `id=${a._id}`]);

        headDiv.appendChild(span);
        headDiv.appendChild(button);
        accorionDiv.appendChild(headDiv);
        section.appendChild(accorionDiv);

        button.addEventListener('click', (ev) => getArticleContent(section, a._id, ev))

        return section;
    })
}

async function getArticleContent(section, id, ev) {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

    const response = await fetch(url);
    const dataContent = await response.json();

    dataContent.forEach(c => {
        const extraDiv = createEl('div', '', ['class=extra']);
        const p = createEl('p', c.content);

        extraDiv.appendChild(p);
        section.appendChild(extraDiv);

        if (ev.textContent == 'More') {
            extraDiv.style.display = 'block';
            ev.textContent == 'Less';
        } else if (ev.textContent == 'Less') {
            extraDiv.style.display = '';
            ev.textContent == 'More';
        }

        return section;
    })

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
