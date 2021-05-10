import {html} from 'https://unpkg.com/lit-html?module';
import {login} from "../api/data.js";

// it has to accept the conSubmit function for submit event
const loginTemplate = (onSubmit) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <!--ADD A EVENT LISTENER TO SUBMIT-->
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login"/>
            </div>
        </div>
    </form>`

export async function loginPage(context) {
    // it must be initialized first and takes htmlString,
    context.render(loginTemplate(onSubmit));

    // it must take event
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        // here is not need any validations because if there is no registered user already the server throws error
        await login(email, password)

        // update the buttons of the logged user
        context.setUserNav();

        // redirect to another page using context
        context.page.redirect('/');
    }
}