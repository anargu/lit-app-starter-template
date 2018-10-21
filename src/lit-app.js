import { LitElement } from "@polymer/lit-element";
import { html /*, render*/ } from 'lit-html'

import { when } from 'lit-html/directives/when'
import { until } from 'lit-html/directives/until'
import { guard } from 'lit-html/directives/guard'
import { ifDefined } from 'lit-html/directives/if-defined'
import { asyncAppend } from 'lit-html/directives/async-append'
import { asyncReplace } from 'lit-html/directives/async-replace'

import './components/toolbar/toolbar.js'
import appCss from './lit-app.styl'
import './components/box-card/box-card.js'

import { offlineWatcher } from './helpers/network'

const wait = (t) => new Promise((resolve) => setTimeout(resolve, t))
async function* countUp() {
    let i = 0;
    while (i < 10) {
        yield i++;
        await wait(1000);
    }
}

const redTextStyle = 'color: red;'

class LitApp extends LitElement {

    constructor() {
        super()

        this.whenCheckbox = false
        this.openPostDetail = false
        this.guardItems = ['blue', 'red', 'green']

        this.setOfflineWatcher()
    }

    static get properties() {
        return {
            whenCheckbox: Boolean,
            guardItems: Array,
            offline: Boolean
        }
    }

    setOfflineWatcher() {
        this.offline = false
        offlineWatcher((isOffline) => {
            this.offline = isOffline
        })
    }

    render() {
        return html`
        <style>
        ${appCss}
        </style>
        
        ${when(this.offline, () => html`
            <div class="offline-mode">Offline mode. Please check your connection</div>
        `, () => {})}

        <m-toolbar title="Lit-App template"></m-toolbar>

        <div class="page-container">

            <h2>Examples with Lit-html</h2>

            <box-card title="when directive">
                <label>Trigger:</label>
                <input type="checkbox" .checked?=${this.whenCheckbox} @click=${ (e) => this.whenCheckbox = !this.whenCheckbox }>
                ${ when(this.whenCheckbox, () => html`<div>true template</div>`, () => html`<div>false template</div>`) }
            </box-card>

            <box-card title="until directive">
                <div id="slot"></div>
                ${until(
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(html`<div>Response of promise!</div>`)
                        }, 3000);
                    }),
                    html`<div>a content <b>until</b> we wait for the promise resolution</div>`
                )}
            </box-card>


            <box-card title="guard directive">
                <p>Re-render only if items length is greater than 5 </p>
                <button @click=${() => this.guardItems = [...this.guardItems, 'yellow']}>Modify Items!</button>
                ${guard((this.guardItems.length > 5),
                    () => { 
                        console.log('guard Fn is triggered!')
                        return this.guardItems.map((item, i) => html`${` ${item} - ${i} `}`)
                    }
                )}
            </box-card>


            <box-card title="if-defined directive">
                <p>If defined...</p>
                <p style=${ifDefined(redTextStyle)}>This sample text has a red color text</p>
                <p>If not defined...</p>
                <p style=${ifDefined(undefined)}>This sample text has no color text</p>
            </box-card>


            <box-card title="async-append async-replace directive">
                <p>${html`Count (appended): <span>${asyncAppend(countUp())}</span>.`}</p>
                <p>${html`Count (replaced): <span>${asyncReplace(countUp())}</span>.`}</p>
            </box-card>
        </div>
        `
    }
}

customElements.define('lit-app', LitApp)