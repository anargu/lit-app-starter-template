import feather from 'feather-icons'

// layers
export const featherIcon = function (iconName, className) {
    return new DOMParser().parseFromString(
        feather.icons[iconName].toSvg({ class: className }),
        'image/svg+xml'
    ).documentElement
}