import { randomFeatherIcon/*, featherIcon */ } from '../../src/components/commons/icons.js'

describe('return a different icon each time it\'s clicked', () => {

    it('should return a different icon name from the icon name given', () => {
        expect(randomFeatherIcon('anchor')).not.toBe('anchor')
    })
})