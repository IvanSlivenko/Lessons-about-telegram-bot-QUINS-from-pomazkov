const devInfo = async (ctx) => {
    const chatId = ctx.chat?.id
    const userId = ctx.from?.id
    const username = ctx.from?.username || '—'
    const firstName = ctx.from?.first_name || '—'

    await ctx.reply(
        `🛠 Службова інформація\n` +
        `----------------------\n` +
        `chat_id: ${chatId}\n` +
        `user_id: ${userId}\n` +
        `username: @${username}\n` +
        `name: ${firstName}`
    )
}

module.exports = { devInfo }