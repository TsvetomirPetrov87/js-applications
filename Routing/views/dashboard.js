import {html} from 'https://unpkg.com/lit-html?module';
import {getFurniture} from "../api/data.js";

const dashboardTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        <!--MAP THE DATA-->
        ${data.map(itemTemplate)}
    </div>`

// innerTemplate for a Single item
const itemTemplate = (item) => html`
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

export async function dashboardPage(context) {
    // get all data from the server
    const data = await getFurniture();
    // pass the data to template
    context.render(dashboardTemplate(data))
}