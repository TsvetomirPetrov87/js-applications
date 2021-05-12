import { html } from '../../node_modules/lit-html/lit-html.js'

const likeTemplate = () => html`
`

export async function homePage(ctx) {
    // const token = sessionStorage.getItem('authToken')
    
    // if(token != null) {
    //     return ctx.page.redirect('/catalog')
    // }

    ctx.render(homeTemplate())
}