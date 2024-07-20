export function getInitData(itemName){
    try {
        const menus = localStorage.getItem(itemName)
        return JSON.parse(menus)
    } catch (error) {
        return undefined
    }
}