import feather from 'feather-icons'

// layers
export const featherIcon = function (iconName, className) {
    return new DOMParser().parseFromString(
        feather.icons[iconName].toSvg({ class: className }),
        'image/svg+xml'
    ).documentElement
}

export const randomFeatherIcon = function (activeIcon = '') {
    const icons = ['layers', 'circle', 'anchor', 'activity']
    let index = Math.floor(Math.random() * icons.length)

    if (activeIcon === icons[index]) {
        return randomFeatherIcon(activeIcon)
    }
    return icons[index]
}