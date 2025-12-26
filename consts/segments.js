const segments = []

const questionsMitOptions = [
    {
        "id": 1,
        "text": "",
        "hasOptions": true,
        "options": [
            { "id": 1, "text": "Text 1", isCorrect: false },
            { "id": 2, "text": "Text 2", isCorrect: true },
            { "id": 4, "text": "Text 3", isCorrect: false },
            { "id": 4, "text": "Text 4", isCorrect: false },
        ],

    }
]

const questionsWithOptions = [
    {
        "id": 1,
        "text": "Text 1",
        "hasOptions": false,
        "answer": "Answer 1",
    }
]


module.exports = {
    segments,
    questionsMitOptions,
    questionsWithOptions
}