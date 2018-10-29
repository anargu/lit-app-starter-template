
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './toolbar.styl'
import eyeSVG from '../../assets/eye.svg'
import heartSVG from '../../assets/heart.svg'
import searchSVG from '../../assets/heart.svg'
import svg from '../../utils/inlinesvg'

const iconsMap = {
	'eye': eyeSVG,
	'heart': heartSVG,
	'search': searchSVG
}
const indexIconsMap = {
	0: 'eye',
	1: 'heart',
	2: 'search'
}
const iconsSize = Object.keys(iconsMap).length

class Toolbar extends LitElement {

	constructor() {
		super()

		this.title = '<no name>'
		this.icon = this.randomIcon()
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

	randomIcon(activeIcon = '') {
		let index = Math.floor(Math.random() * iconsSize)
		
		if (activeIcon === indexIconsMap[index]) {
			return this.randomIcon(activeIcon)
		}
		return indexIconsMap[index]
	}

    render() {
        return html`
		<style>
		${css}
		</style>
		<div class="toolbar-content">
			<span
				@click=${() => this.icon = this.randomIcon(this.icon)}
				class="arrowright">
				${svg(iconsMap[this.icon])}
			</span>
			<a href="#">${this.title}</a>
		</div>
		`
	}
}

customElements.define('m-toolbar', Toolbar)