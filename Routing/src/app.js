import page from "//unpkg.com/page/page.mjs";
import {render} from 'https://unpkg.com/lit-html?module';

import {createPage} from "../views/create.js";
import {dashboardPage} from "../views/dashboard.js";
import {registerPage} from "../views/register.js";
import {loginPage} from "../views/login.js";
import {myPage} from "../views/myFurniture.js";
import {detailsPage} from "../views/details.js";
import {editPage} from "../views/edit.js";
import {logout} from "../api/api.js";

// the querySelector must be initialized here
const main = document.querySelector('.container')

page('/', renderMiddleware, dashboardPage)
page('/dashboard', renderMiddleware, dashboardPage)
page('/details/:id', renderMiddleware, detailsPage)
page('/create', renderMiddleware, createPage);
page('/edit/:id', renderMiddleware, editPage)
page('/register', renderMiddleware, registerPage)
page('/login', renderMiddleware, loginPage)
page('/my-furniture', renderMiddleware, myPage)

// setUserNav must be before show the page content with page.start
setUserNav()

// logout is a function it is not a page, so it has an event
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/')
})

// start the application
page.start();

function renderMiddleware(context, next) {
    context.render = (content) => render(content, main)
    context.setUserNav = setUserNav;
    next()
}

// update the navigation buttons
function setUserNav() {
    const userId = sessionStorage.getItem('userId')
    if (userId != null) {
        // if the css is broken it must be inline-block, else it is just block
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}