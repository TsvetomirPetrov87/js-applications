import { html } from '../../node_modules/lit-html/lit-html.js'

import { getPetById } from '../api/data.js'
import { editPet } from '../api/data.js'

const editTemplate = (pet, onSubmit, onSave) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Pet</legend>
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                    <input type="text" name="name" id="name" .value=${pet.name}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" .value=${pet.description}>Today, some dogs are
                                        used as pets, others are used to help
                                        humans do their work. They are a popular
                                        pet because they are usually playful,
                                        friendly, loyal and listen to humans.
                                        Thirty million dogs in the United States
                                        are registered as pets.[5] Dogs eat both
                                        meat and vegetables, often mixed
                                        together and sold in stores as dog food.
                                        Dogs often have jobs, including as
                                        police dogs, army dogs, assistance dogs,
                                        fire dogs, messenger dogs, hunting dogs,
                                        herding dogs, or rescue dogs.</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${pet.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${pet.type}>
                        <option value="cat">Cat</option>
                        <option value="dog" selected>Dog</option>
                        <option value="parrot">Parrot</option>
                        <option value="reptile">Reptile</option>
                        <option value="other">Other</option>
                    </select>
                </span>
            </p>
            <input @click=${onSave} class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`

export async function editPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);

    ctx.render(editTemplate(pet, onSubmit, onSave))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const name = formData.get('name').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const type = formData.get('type').trim();

        if (name == '' || description == '' || imageUrl == '' || type == '') {
            return alert('All fields are required!')
        }

        await editPet(pet._id, {
            name,
            description,
            imageUrl,
            type
        })

    }

    async function onSave() {
        ctx.page.redirect('/details' + petId)
    }
}