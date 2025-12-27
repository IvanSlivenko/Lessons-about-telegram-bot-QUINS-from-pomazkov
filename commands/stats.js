const { getUserStats } = require('../stats')

const statsCommand = async (ctx) => {
    const userId = ctx.from.id
    const stats = getUserStats(userId)

    const text = `
📊 *Ваша статистика*

❓ Питань: ${stats.total}
✅ Правильних: ${stats.correct}
❌ Неправильних: ${stats.wrong}

📚 По темах:
${Object.entries(stats.topics)
            .map(([topic, s]) =>
                `• ${topic}: ${s.correct}/${s.total}`
            ).join('\n')}
`

    await ctx.reply(text, { parse_mode: 'Markdown' })
}

module.exports = { statsCommand }
