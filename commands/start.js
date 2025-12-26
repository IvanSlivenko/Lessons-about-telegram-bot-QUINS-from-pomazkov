// const { Keyboard } = require('grammy')

// export const startCommand = async (ctx) => {
//     // console.log(ctx);
//     const startKeyboard = new Keyboard()
//         .text('1C').row()
//         .text('Бізнес-процеси').row()
//         .text('Події 1С у бізнес-процесах')
//         .resized();
//     await ctx.reply(`Привіт`,
//         {
//             reply_markup: startKeyboard
//         }

//     )

// }

const { Keyboard, InlineKeyboard } = require('grammy')

const startCommand = async (ctx) => {
    const startKeyboard = new Keyboard()
        .text('1C').row()
        .text('Бізнес-процеси').row()
        .text('Події 1С у бізнес-процесах')
        .resized()


    await ctx.reply('Привіт.')

    await ctx.reply('Оберіть питання', {
        reply_markup: startKeyboard
    })
}

module.exports = { startCommand }