export const formatDate = function (isoDate) {
    const date = new Date(isoDate)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()%2000}`
}