import { html } from '../../node_modules/lit-html/lit-html.js'

import { getPetById } from '../api/data.js'
import { deletePet } from '../api/data.js'
import { addLike } from '../api/data.js'
import { checkUserLiked } from '../api/data.js'
import { getLikes } from '../api/data.js'

const detailsTemplate = (pet, isOwner, onDelete, onLike, hasLiked, likesCount) => html`
<section id="details-page" class="details">
    <div class="pet-information">
        <h3>Name: ${pet.name}</h3>
        <p class="type">Type: ${pet.type}</p>
        <p class="img"><img src=${pet.imageUrl}></p>
        <div class="actions">

            <!-- Edit/Delete buttons ( Only for creator of this pet )  -->
            ${isOwner ? html`
            <a class="button" href="/edit/${pet._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
            ` : ''}
            
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
            ${(!isOwner && hasLiked == 0) ? html`
            <a @click=${onLike} id="likeBtn" class="button" href="javascript:void(0)">Like</a>`
                : ``}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likesCount}</span>
            </div>

            <!-- Bonus -->    
        </div>
    </div>
    <div class="pet-description">
        <h3>Description:</h3>
        <p>${pet.description}</p>
    </div>
</section>`

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);

    const userId = sessionStorage.getItem('userId')
    const isOwner = pet._ownerId === userId

    const hasLiked = await checkUserLiked(petId, userId);
    const likesCount = await getLikes(petId);

    ctx.render(detailsTemplate(pet, isOwner, onDelete, onLike, hasLiked, likesCount))

    async function onDelete() {
        const confirmed = confirm('Are you shure you wan to delete this pet?');
        if (confirmed) {
            await deletePet(petId)
            ctx.page.redirect('/dashboard')
        }
    }

    async function onLike() {
        await addLike(petId);
        ctx.setUserNav();
    }
}

