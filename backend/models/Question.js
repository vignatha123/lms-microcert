const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quizId: { type: String, required: true }, // allow multiple quizzes in future
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true } // store index (0..)
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);