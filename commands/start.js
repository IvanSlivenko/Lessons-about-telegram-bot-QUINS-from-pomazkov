
const { Keyboard } = require('grammy')

const startCommand = async (ctx) => {
    const startKeyboard = new Keyboard()
        .text('Структура компанії').row()
        .text('Бізнес-процеси').row()
        .text('Програмне забезпечення').row()
        .text('Випадкове питання')
        .resized()


    await ctx.reply('Привіт.')

    await ctx.reply('Оберіть тему', {
        reply_markup: startKeyboard
    })
}

module.exports = { startCommand }