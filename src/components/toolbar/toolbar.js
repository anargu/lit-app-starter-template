
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './toolbar.styl'
import { featherIcon, randomFeatherIcon } from '../commons/icons.js'

class Toolbar extends LitElement {

	constructor() {
		super()

		this.title = '<no name>'
		this.icon = randomFeatherIcon()
	}

    static get properties () {
        return {
			title: String,
			icon: String
		}
	}
	
	doSomething() {
		return 'something'
	}

    render() {
        return html`
		<style>
		${css}
		</style>
		<div class="toolbar-content">
			<span @click=${() => this.icon = randomFeatherIcon(this.icon)}>${featherIcon(this.icon, 'arrowright')}</span>
			<a href="#">${this.title}</a>
		</div>
		`
	}
}

customElements.define('m-toolbar', Toolbar)