let parser
if (parser === null || parser === undefined) {
    parser = new DOMParser()
}

export default function getElement(inlineSVGString) {
    let svg = parser.parseFromString(inlineSVGString, 'image/svg+xml')
    return svg.documentElement
}

