require('dotenv').config();
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy')
const { startCommand } = require('./commands')
const { topicMap, buttonsList } = require('./consts')
const { commandsList } = require('./consts/commandsList')
const { getRandomQuestion, getCorrectAnswer, getCorrectAnswerTwo } = require('./utils')

// Створюємо нового бота
const bot = new Bot(process.env.BOT_API_KEY)

//Додаємо команди до кнопки меню
bot.api.setMyCommands(commandsList)

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
bot.hears(buttonsList,
    async (ctx) => {
        // const topic = ctx.message.text;
        // const question = getRandomQuestion(topic)

        // console.log('--------text---------', ctx.message.text);
        // console.log('--------topicMap---------', topicMap);


        const topicKey = topicMap[ctx.message.text]

        if (!topicKey) {
            await ctx.reply('Невідомий розділ 🤷‍♂️')
            return
        }

        const question = getRandomQuestion(topicKey)

        let inlineKeyboard;

        if (question.hasOptions) {
            const buttonRows = question.options.map((option) => [
                InlineKeyboard.text(option.text, JSON.stringify({
                    type: `${topicKey}-option`,
                    isCorrect: option.isCorrect,
                    questionId: question.id,
                }),
                ),
            ]);

            inlineKeyboard = InlineKeyboard.from(buttonRows)
        } else {
            //------------------------------------------------- var with variants answer
            inlineKeyboard = new InlineKeyboard()
                .text('Отримати відповідь', JSON.stringify({
                    // type: ctx.message.text,
                    type: topicKey,
                    questionId: question.id,
                }))
        }

        await ctx.reply(question.text, {
            reply_markup: inlineKeyboard
        })
    }
)


bot.on('callback_query:data', async (ctx) => {

    const callbackData = JSON.parse(ctx.callbackQuery.data)

    if (!callbackData.type.includes('option')) {
        // const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);
        const answer = getCorrectAnswerTwo(callbackData.type, callbackData.questionId);
        await ctx.reply(answer.text, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        })
        await ctx.answerCallbackQuery()
        return;
    }

    if (callbackData.isCorrect) {
        await ctx.reply('Вірно ')
        await ctx.answerCallbackQuery()
        return
    }

    // const answer = getCorrectAnswer(callbackData.type.split('-')[0], callbackData.questionId);
    const answer = getCorrectAnswerTwo(callbackData.type.split('-')[0], callbackData.questionId);
    await ctx.reply(`Не вірно.\n --------------------------\n Вірна відповідь:\n ===============\n ${answer.text}`);
    await ctx.answerCallbackQuery();
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