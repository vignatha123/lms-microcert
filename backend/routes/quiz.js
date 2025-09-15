const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// Get all questions for a quiz (no correct answers returned)
router.get('/:quizId', auth, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const questions = await Question.find({ quizId }).select('-correctAnswerIndex -createdAt -updatedAt');
        res.json({ questions });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// (Optional) Admin-only ability to get full questions including correct answers
router.get('/:quizId/admin', async (req, res) => {
    // For simplicity no admin auth: in real app protect this.
    const quizId = req.params.quizId;
    const questions = await Question.find({ quizId });
    res.json({ questions });
});

module.exports = router;