import { html } from '../../node_modules/lit-html/lit-html.js'

import { getPets } from '../api/data.js'

const dashboardTemplate = (pets) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
            
        ${pets.length == 0 ? html`<p class="no-pets">No pets in database!</p>` 
        : html`<ul class="other-pets-list">
        ${pets.map(petTemplate)}
        </ul>`}
</section>`

const petTemplate = (pet) => html`
<li class="otherPet">
    <h3>Name: ${pet.name}</h3>
    <p>Type: ${pet.type}</p>
    <p class="img"><img src=${pet.imageUrl}></p>
    <a class="button" href="/details/${pet._id}">Details</a>
</li>`

export async function dashboardPage(ctx) {
    const pets = await getPets()

    ctx.render(dashboardTemplate(pets))
}
