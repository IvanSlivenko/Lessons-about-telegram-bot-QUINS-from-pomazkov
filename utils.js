const questions = require('./questionsOne.json')
const { Random } = require('random-js')



const getRandomQuestion = (topic) => {

    const random = new Random();


    const questionTopic = topic.toLowerCase();
    // const randoQuestionIndex = Math.floor(
    //     Math.random() * questions[questionTopic].length
    // );

    const randoQuestionIndex = random.integer(
        0,
        questions[questionTopic].length - 1
    )

    return questions[questionTopic][randoQuestionIndex];
}

//const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);
// const getCorrectAnswer = (topicKey, id) => {
const getCorrectAnswer = (topic, id) => {
    const question = questions[topic].find((question) => question.id === id)

    if (!question.hasOptions) {
        return question.answer
    }
    return question.options.find((option) => option.isCorrect).text();
}

const getCorrectAnswerTwo = (topicKey, questionId) => {
    const topic = questions[topicKey]
    if (!topic) return null

    const question = topic.find(q => q.id === questionId)
    if (!question) return null

    return question.options.find(o => o.isCorrect)
}



const getCurrentAnswer = (topicKey, questionId, optionId) => {
    const topic = questions[topicKey]
    if (!topic) return null

    const question = topic.find(q => q.id === questionId)
    if (!question) return null

    return question.options.find(o => o.id === optionId)
}


module.exports = { getRandomQuestion, getCorrectAnswer, getCorrectAnswerTwo, getCurrentAnswer }

