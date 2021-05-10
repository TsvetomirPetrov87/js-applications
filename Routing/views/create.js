import {html} from 'https://unpkg.com/lit-html?module';
import {createRecord} from "../api/data.js";

const createTemplate = (onSubmit, make, model, year, description, price, img) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class=${'form-control' + (make ? ' is-valid' : ' is-invalid')} id="new-make" type="text"
                           name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class=${'form-control' + (model ? ' is-valid' : ' is-invalid')} id="new-model" type="text"
                           name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class=${'form-control' + (year ? ' is-valid' : ' is-invalid')} id="new-year" type="number"
                           name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class=${'form-control' + (description ? ' is-valid' : ' is-invalid')} id="new-description"
                           type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class=${'form-control' + (price ? ' is-valid' : ' is-invalid')} id="new-price" type="number"
                           name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class=${'form-control' + (img ? ' is-valid' : ' is-invalid')} id="new-image" type="text"
                           name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create"/>
            </div>
        </div>
    </form>`;


export async function createPage(context) {

    context.render(createTemplate(onSubmit, false, false, false, false, false, false));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const make = formData.get('make').trim()
        const model = formData.get('model').trim()
        const year = Number(formData.get('year').trim())
        const description = formData.get('description').trim()
        const price = Number(formData.get('price').trim())
        const img = formData.get('img').trim()
        const material = formData.get('material').trim()

        let validate = {make: true, model: true, year: true, description: true, price: true, img: true}

        if (make.length < 4) {
            validate.make = false;
            alert('Make must be at least 4 symbols long')
        }
        if (model.length < 4) {
            validate.model = false;
            alert('Model must be at least 4 symbols long')
        }
        if (year <= 1950 || year >= 2050) {
            validate.year = false;
            alert('Year must be between 1950 and 2050')
        }
        if (description.length < 10) {
            validate.description = false;
            alert('Description must be more than 10 symbols')
        }
        if (isNaN(price) || price <= 0) {
            validate.price = false;
            alert('Price must be a positive number')
        }
        if (img === "") {
            validate.img = false;
            alert('Image URL is required')
        }

        let isValid = Object.values(validate).some(v => v === false)
        // returns true if contains false
        if (isValid) {
            context.render(createTemplate(onSubmit, validate.make, validate.model, validate.year, validate.description,
                validate.price, validate.img));
        } else {
            //all is ok
            let data = {
                make: make,
                model: model,
                year: year,
                description: description,
                price: price,
                img: img,
                material: material
            }
            await createRecord(data)
            context.render(createTemplate(onSubmit, validate.make, validate.model, validate.year, validate.description,
                validate.price, validate.img));
            context.page.redirect('/');
        }
    }
}


