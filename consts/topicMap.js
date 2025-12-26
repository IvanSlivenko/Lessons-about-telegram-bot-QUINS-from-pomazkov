
const BUTTONS = {
    STRUCTURE: 'Структура компанії',
    PROCESSES: 'Бізнес-процеси',
    SOFTWARE: 'Програмне забезпечення'
}

const buttonsList = Object.values(BUTTONS)

const topicMap = {
    [BUTTONS.STRUCTURE]: 'structure',
    [BUTTONS.PROCESSES]: 'processes',
    [BUTTONS.SOFTWARE]: 'software'
}



module.exports = { topicMap, buttonsList }