
const BUTTONS = {
    STRUCTURE: 'Структура компанії',
    PROCESSES: 'Бізнес-процеси',
    SOFTWARE: 'Програмне забезпечення',
    ANYQUESTION: 'Випадкове питання'
}

const buttonsList = Object.values(BUTTONS)

const topicMap = {
    [BUTTONS.STRUCTURE]: 'structure',
    [BUTTONS.PROCESSES]: 'processes',
    [BUTTONS.SOFTWARE]: 'software',
    [BUTTONS.ANYQUESTION]: 'anyquestion'
}



module.exports = { topicMap, buttonsList }