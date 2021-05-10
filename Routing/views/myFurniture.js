import {html} from 'https://unpkg.com/lit-html?module';
import {getMyFurniture} from "../api/data.js";

const myTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(aFurniture)}
    </div>`;

// innerTemplate for a Single item
const aFurniture = (item) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}"/>
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <!-- THIS IS HOW I PASS ITEM ID AND DELEGATE THE TO THE ROUTER-->
                    <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`

export async function myPage(context) {

    const data = await getMyFurniture();
    context.render(myTemplate(data))
}