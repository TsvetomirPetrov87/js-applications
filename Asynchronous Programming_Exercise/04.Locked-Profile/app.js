function lockedProfile() {
    const main = document.getElementById('main');
    main.innerHTML = '';

    getProfile();

    async function getProfile() {
        const url = `http://localhost:3030/jsonstore/advanced/profiles`;

        const response = await fetch(url);
        const data = await response.json();

        let profiles = Object.values(data).forEach(user => {
            const profileDiv = createEl('div', '', ['class=profile']);
            const img = createEl('img', '', ['src=./iconProfile2.png', 'class=userIcon']);
            const lockLabel = createEl('label', 'Lock');
            const lockInput = createEl('input', '', ['type=radio', 'name=user1Lock', 'value=lock']);
            lockInput.checked = true;
            const unlockLabel = createEl('label', 'Unlock');
            const unlockInput = createEl('input', '', ['type=radio', 'name=user1Unlock', 'value=unlock']);
            unlockInput.checked = false;
            const br = createEl('br');
            const hr1 = createEl('hr');
            const usernameLabel = createEl('label', 'Username');
            const usernameInput = createEl('input', '', ['type=text', 'name=user1Username', `value=${user.username}`]);
            usernameInput.disabled = true;
            usernameInput.readonly = true;
            const userDiv = createEl('div', '', ['id', 'user1HiddenFields']);
            const hr2 = createEl('hr');
            const emailLabel = createEl('label', 'Email:');
            const emailInput = createEl('input', '', ['type=email', 'name=user1Email', `value=${user.email}`]);
            emailInput.disabled = true;
            emailInput.readonly = true;
            const ageLabel = createEl('label', 'Age:');
            const ageInput = createEl('input', '', ['type=email', 'name=user1Age', `value=${user.age}`]);
            ageInput.disabled = true;
            ageInput.readonly = true;
            const button = createEl('button', 'Show more');

            userDiv.appendChild(hr2);
            userDiv.appendChild(emailLabel);
            userDiv.appendChild(emailInput);
            userDiv.appendChild(ageLabel);
            userDiv.appendChild(ageInput);

            profileDiv.appendChild(img);
            profileDiv.appendChild(lockLabel);
            profileDiv.appendChild(lockInput);
            profileDiv.appendChild(unlockLabel);
            profileDiv.appendChild(unlockInput);
            profileDiv.appendChild(br);
            profileDiv.appendChild(hr1);
            profileDiv.appendChild(usernameLabel);
            profileDiv.appendChild(usernameInput);
            profileDiv.appendChild(userDiv);
            profileDiv.appendChild(button);
            main.appendChild(profileDiv);

            button.addEventListener('click', (ev) => showMore(main, ev))

            return main;
        })

    }

    function showMore(main, ev) {
        const infoForUser = main.querySellectorAll('input[name="user1Lock"]');
        if (ev.textContent == 'Show more') {
            if (infoForUser[1].checked == true) {
                main.getElementById('user1HiddenFields').style.display = 'block';
                ev.target.textContent = 'Hide it'
            }
        } else {
            if (infoForUser[1].checked == true) {
                profileDiv.getElementById('user1HiddenFields').style.display = 'none';
                ev.target.textContent = 'Show more'
            }
        }
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

}
