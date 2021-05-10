import {html} from 'https://unpkg.com/lit-html?module';
import {register} from "../api/data.js";

// it accepts onSubmit func because it is engraved in the form
// the invalidEmail and etc are boolean values to fix the class for special effects
const registerTemplate = (onSubmit, invalidEmail, invalidPass, invalidRe, errorMsg) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <!--PUT @submit=$...someFunc-->
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <!--THIS IS HOW TO TROW ERROR MESSAGE-->
                ${errorMsg ? html`<p>Error message</p>` : ""}
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <!--THIS IS HOW TO SET DIFFERENT CLASSES-->
                    <input class=${'form-control' + (invalidEmail ? ' is-invalid' : "")} id="email" type="text"
                           name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <!--THIS IS HOW TO SET DIFFERENT CLASSES-->
                    <input class=${'form-control' + (invalidPass ? ' is-invalid' : "")} id="password" type="password"
                           name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <!--THIS IS HOW TO SET DIFFERENT CLASSES-->
                    <input class=${'form-control' + (invalidRe ? ' is-invalid' : "")} id="rePass" type="password"
                           name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register"/>
            </div>
        </div>
    </form>`

// THIS FUNCTION CALL THE TEMPLATE AND ADD HTML TO INDEX.HTML
export async function registerPage(context) {
    // If the func for the template has a @event, it must takes a callback function -> onSubmit in this case
    context.render(registerTemplate(onSubmit));

    // THE FUNC onSubmit is here because i need entrance to the context
    // IS A MUST TO TAKE EVENT
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        // MUST CHECK THE FIELDS ATTRIBUTE NAMES
        const rePass = formData.get('rePass').trim()
        if (rePass === "" || password === "" || email === "") {
            // the last boolean is for error message
            context.render(registerTemplate(onSubmit, email === "", password === "", rePass === "", true))
            return alert('All fields are required!')
        }
        if (rePass !== password) {
            context.render(registerTemplate(onSubmit, false, true, true, true))
            return alert('Both passwords do not match')
        }
        // create an user
        await register(email, password)

        // update the buttons of the logged user
        context.setUserNav();

        // redirect to another page using context
        context.page.redirect('/')
    }

}