const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Result = require('../models/Result');
const Question = require('../models/Question');

// Submit answers -> validate and save result
router.post('/submit', auth, async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        if (!quizId || !Array.isArray(answers)) return res.status(400).json({ message: 'Invalid payload' });

        // fetch question list with correct answers
        const questions = await Question.find({ quizId }).sort({ _id: 1 });
        if (!questions.length) return res.status(400).json({ message: 'No questions found' });

        let score = 0;
        const total = questions.length;
        // answers array expected to be indexes: [0,2,1,...]
        questions.forEach((q, idx) => {
            const correctIndex = q.correctAnswerIndex;
            const given = answers[idx];
            if (typeof given === 'number' && given === correctIndex) score++;
        });

        const passThreshold = Math.ceil(total * 0.5); // 50% pass threshold
        const passed = score >= passThreshold;

        const result = new Result({
            userId: req.user._id,
            quizId,
            score,
            total,
            passed
        });
        await result.save();

        res.json({
            result: {
                id: result._id,
                score,
                total,
                passed,
                date: result.date
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get user's results
router.get('/my', auth, async (req, res) => {
    const results = await Result.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ results });
});

// Get a single result by id (for certificate)
router.get('/:id', auth, async (req, res) => {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ result });
});

module.exports = router;