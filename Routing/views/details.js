import {html} from 'https://unpkg.com/lit-html?module';
import {getItemById, deleteRecord} from "../api/data.js";

const detailTemplate = (item, onDelete, isOwner) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img}>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            <!--decide whether the user is the owner or not-->
            ${isOwner ? html`
                <div>
                    <!-- here i put the reference to a another page-->
                    <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
                    <!--it is javascript:void(0) because it is a function,not reference to a page-->
                    <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>` : ""}
        </div>
    </div>`;

export async function detailsPage(context) {
    const item = await getItemById(context.params.id);
    const userId = sessionStorage.getItem('userId')

    context.render(detailTemplate(item, onDelete, userId === item._ownerId))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete it?');
        if (confirmed) {
            await deleteRecord(item._id)
            context.page.redirect('/');
        }
    }
}