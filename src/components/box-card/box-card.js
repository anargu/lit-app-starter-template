import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './box-card.styl'

class BoxCard extends LitElement {

    static get properties() {
        return {
            title: String
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="title">${this.title}</div>
        
        <slot></slot>
        
        `
    }
}

customElements.define('box-card', BoxCard)