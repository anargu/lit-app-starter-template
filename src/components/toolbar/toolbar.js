
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './toolbar.styl'
import { featherIcon } from '../commons/icon.js'

class Toolbar extends LitElement {

	constructor() {
		super()

		this.title = '<no name>'
		// console.log('f', feather.icons.circle.toSvg())
		// console.log('g', iconEl)
	}

	toolbarIcon() {
		let span = document.createElement('span')
		span.style = 'vertical-align: sub;'
		const icon = feather.icons['layers'].toSvg({ class: 'arrowright' })
		span.innerHTML = icon
		return span
	}

    static get properties () {
        return {
			title: String
		}
    }

    render() {
        return html`
		<style>
		${css}
		</style>
		<div class="toolbar-content">
			<span>${featherIcon('layers', 'arrowright')}</span>
			<a href="#">${this.title}</a>
		</div>
		`
	}
}

customElements.define('m-toolbar', Toolbar)