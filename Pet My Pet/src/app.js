import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js' 

import {logout} from './api/data.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { dashboardPage } from './views/dashboard.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { myPetsPage } from './views/myPets.js'

const main = document.getElementById('site-content'); 

setUserNav()

document.getElementById('logoutBtn').addEventListener('click', logoutHandler) 

page('/dashboard', renderMiddleWare, dashboardPage)
page('/login', renderMiddleWare, loginPage)
page('/register', renderMiddleWare, registerPage)
page('/create', renderMiddleWare, createPage)
page('/details/:id', renderMiddleWare, detailsPage)
page('/edit/:id', renderMiddleWare, editPage)
page('/myPets', renderMiddleWare, myPetsPage)


page.start(); 

function renderMiddleWare(ctx, next) {
  ctx.render = (content) => render(content, main)
  ctx.setUserNav = setUserNav;                  
  next()                                        
}

function setUserNav() { 
  const email = sessionStorage.getItem('email');
  if (email != null) {
    document.querySelector('.navbar-dashboard #user > span').textContent = `Welcome, ${email}`
    document.getElementById('user').style.display = '';
    document.getElementById('guest').style.display = 'none';
  } else {
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = '';
  }
}

async function logoutHandler() {
  await logout();
  setUserNav() 
  sessionStorage.clear()
  page.redirect('/dashboard')
}