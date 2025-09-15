/**
 * seed.js
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');
const Question = require('./models/Question');
const bcrypt = require('bcryptjs');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/lms_microcert';

async function seed() {
    try {
        await mongoose.connect(MONGO);
        console.log('Connected to DB for seeding.');

        // Clear
        await Question.deleteMany({});
        await User.deleteMany({});

        // Create sample user
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('password123', salt);
        const user = new User({ name: 'Test Student', email: 'student@example.com', passwordHash });
        await user.save();

        // Sample quiz (quizId: 'js-basics')
        const qdata = [
            {
                quizId: 'js-basics',
                questionText: 'Which company developed JavaScript?',
                options: ['Mozilla', 'Netscape', 'Microsoft', 'Google'],
                correctAnswerIndex: 1
            },
            {
                quizId: 'js-basics',
                questionText: 'Which keyword declares a constant in JS?',
                options: ['let', 'const', 'var', 'static'],
                correctAnswerIndex: 1
            },
            {
                quizId: 'js-basics',
                questionText: 'Which method converts JSON to object?',
                options: ['JSON.toObject', 'JSON.parse', 'JSON.stringify', 'JSON.convert'],
                correctAnswerIndex: 1
            }
        ];

        for (const q of qdata) {
            const question = new Question(q);
            await question.save();
        }

        console.log('Seed completed. User: student@example.com / password: password123');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();