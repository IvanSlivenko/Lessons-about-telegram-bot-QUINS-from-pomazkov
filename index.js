require('dotenv').config();
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy')
const { startCommand } = require('./commands')
const { segments } = require('./consts/index')

// Створюємо нового бота
const bot = new Bot(process.env.BOT_API_KEY)

//Додаємо команди до кнопки меню
bot.api.setMyCommands([
    { command: 'start', description: 'Запуск бота' }
])

bot.command('start', startCommand)

//----------------------------------------------- var 1
// bot.hears('1C', async (ctx) => {
//     await ctx.reply('Для чого нам 1С ?')
//     await console.log(segments);

// })

// bot.hears('Бізнес-процеси', async (ctx) => {
//     await ctx.reply('Що таке Бізнес-процеси ?')
// })

// bot.hears('Події 1С у бізнес-процесах', async (ctx) => {
//     await ctx.reply('Що таке Події 1С у бізнес-процесах ?')
// })

//------------------------------------------------------------------- var 2
bot.hears(['1C', 'Бізнес-процеси', 'Події 1С у бізнес-процесах'],

    async (ctx) => {
        const inlineKeyboard = new InlineKeyboard()
            .text('Отримати відповідь', JSON.stringify({
                type: ctx.message.text,
                questionId: 1,
            }))
            .text('Відміна', 'cancel');

        await ctx.reply(`Що таке ${ctx.message.text}`, {
            reply_markup: inlineKeyboard
        })
    }
)

bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data === 'cancel') {
        await ctx.reply('Відбулась відміна')
        // await ctx.answerCallbackQuery('Відбулась відміна');
        await ctx.answerCallbackQuery();

    }

})

// Обробка помилок
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

//Запускаємо бот
bot.start()