require('dotenv').config();
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy')
const { startCommand, statsCommand, devInfo } = require('./commands')
const { topicMap, buttonsList } = require('./consts')
const { commandsList } = require('./consts/commandsList')
const { getRandomQuestion, getCorrectAnswer, getCorrectAnswerTwo, getCurrentAnswer, getCorrectAnswerThry, getCurrentQuestion } = require('./utils')
const questions = require('./questionsOne.json')
const { recordAnswer } = require('./stats')


// Створюємо нового бота
const bot = new Bot(process.env.BOT_API_KEY)

//Додаємо команди до кнопки меню
bot.api.setMyCommands(commandsList)

bot.command('start', startCommand)

bot.command('stats', statsCommand)

bot.command('devinfo', devInfo)



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

        const { question, questionTopic } = getRandomQuestion(topicKey)

        let inlineKeyboard;

        if (question.hasOptions) {
            const buttonRows = question.options.map((option) => [
                InlineKeyboard.text(
                    option.text,
                    // JSON.stringify({
                    //     type: `${topicKey}-option`,
                    //     isCorrect: option.isCorrect,
                    //     questionId: question.id,
                    // }),
                    JSON.stringify({
                        // type: `${topicKey}-option`,
                        type: `${questionTopic}-option`,
                        questionId: question.id,
                        optionId: option.id
                    }),

                ),
            ]);

            inlineKeyboard = InlineKeyboard.from(buttonRows)
        } else {
            //------------------------------------------------- var with variants answer
            inlineKeyboard = new InlineKeyboard()
                .text('Отримати відповідь', JSON.stringify({
                    // type: ctx.message.text,
                    // type: topicKey,
                    type: questionTopic,
                    questionId: question.id,
                }))
        }

        await ctx.reply(`Увага запитання:\n---------------------\n ${question.text}`, {
            reply_markup: inlineKeyboard
        })
    }
)


bot.on('callback_query:data', async (ctx) => {

    const callbackData = JSON.parse(ctx.callbackQuery.data)



    if (!callbackData.type.includes('option')) {
        // const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);
        // const answer = getCorrectAnswerTwo(callbackData.type, callbackData.questionId, callbackData.optionId);
        const answer = getCorrectAnswerThry(callbackData.type, callbackData.questionId);
        const currentQustetion = getCurrentQuestion(callbackData.type, callbackData.questionId, callbackData.optionId);

        await ctx.reply(`На запитання:\n--------------------\n${currentQustetion}\n--------------------\nВідповідь :\n==============\n${answer}`, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        })
        await ctx.reply('Можете знову обрати тему')
        await ctx.answerCallbackQuery()
        return;
    }

    // if (callbackData.isCorrect) {
    //     await ctx.reply('Вірно. Можете знову обрати тему ')
    //     await ctx.answerCallbackQuery()
    //     return
    // }

    // const answer = getCorrectAnswer(callbackData.type.split('-')[0], callbackData.questionId);
    const answer = getCorrectAnswerTwo(callbackData.type.split('-')[0], callbackData.questionId, callbackData.optionId);
    const currentAnswer = getCurrentAnswer(callbackData.type.split('-')[0], callbackData.questionId, callbackData.optionId);

    if (currentAnswer.isCorrect) {
        await ctx.reply(`Браво\n-----------------\nВірна відповідь:\n ===============\n ${answer.text}`)
        await ctx.reply('Можете знову обрати тему')

    } else {
        await ctx.reply(`Відповідь:\n--------------------------\n ${currentAnswer.text}\n--------------------------\nНе вірнa.\n ===============\nВірна відповідь:\n ===============\n ${answer.text}`);
        await ctx.reply('Поміркуйте')
    }
    //----------------------------------------------------
    const userId = ctx.from.id
    const topic = callbackData.type.split('-')[0]

    recordAnswer({
        userId,
        topic,
        isCorrect: currentAnswer.isCorrect
    })

    //---------------------------------------------------
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