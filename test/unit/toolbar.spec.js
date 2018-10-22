// import '../../src/components/toolbar/toolbar.js'
import '../../src/components/toolbar/toolbar.js'

describe('test methods of lit elements', () => {

    let toolbar

    beforeEach(async () => {
        toolbar = document.createElement('m-toolbar')
        document.body.appendChild(toolbar)
        await toolbar.updateComplete
        console.log(toolbar)
    })

    it('should return a string', () => {
        expect(toolbar.doSomething()).toBe('something')
    })
})